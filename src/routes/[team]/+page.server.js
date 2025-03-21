import { mysqlConnection } from "$lib/db/mysql";
import { error } from "@sveltejs/kit";
import { TBA_KEY } from '$env/static/private';

export async function load({ params }) {

    // check if team is a number
    const teamNum = Number(params.team);
    if (!Number.isInteger(teamNum)) {
        return error(400, "Team number must be an integer");
    }

    let connection = await mysqlConnection();

    let links, info;
    try {
        links = await connection
            .query(`SELECT * FROM frclink_links WHERE team_num = ?`, params.team)
            .then(([rows, fields]) => {
                return rows;
            });
        info = await connection
            .query(`SELECT * FROM frclink_info WHERE team_num = ? LIMIT 1`, params.team)
            .then(([rows, fields]) => {
                return rows;
            });

    } catch (error) {
        console.error("we got an error!")
        console.log(error)
        return error;
    }

    const teamExists = info.length > 0;
    
    // if team doesn't exist, fetch tba data
    if (!teamExists) {
        const path = `https://www.thebluealliance.com/api/v3/team/frc${teamNum}`;
        const json = await fetch(path, {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": TBA_KEY
            }
        }).then(res => res.json());

        if (json.Error) {
            return error(404, "Team not found: " + json.Error);
        }

        const json_links = await fetch(path + "/social_media", {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": TBA_KEY
            }
        }).then(res => res.json());

        const stuff = {
            "facebook-profile": {
                name: "Facebook",
                url: "https://www.facebook.com/",
                icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F020%2F964%2F386%2Foriginal%2Ffacebook-circle-icon-for-web-design-free-png.png&f=1&nofb=1&ipt=8888f278e445a14d8cc21da16ff0667598481d17c53ed724b24634afee6775b4&ipo=images",
            },
            "github-profile": {
                name: "GitHub",
                url: "https://www.github.com/",
                icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-00.iconduck.com%2Fassets.00%2Fgithub-icon-2048x2048-91rgqivh.png&f=1&nofb=1&ipt=5c842f4ec230f47f6ca5a6b41360b7ca6506a575212d7d72c95a62f126b713b3&ipo=images",
            },
            "instagram-profile": {
                name: "Instagram",
                url: "https://www.instagram.com/",
                icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fdownload%2Flogo%2F69768-logo-computer-layout-instagram-icons-png-file-hd.png&f=1&nofb=1&ipt=9314d88ade917343e7c9dce0e375d447c6f3288a8d1ee8bbbc93388724089a13&ipo=images",
            },
            "twitter-profile": {
                name: "Twitter",
                url: "https://www.twitter.com/",
                icon: "https://webstockreview.net/images/twitter-icons-png-1.png",
            },
            "youtube-channel": {
                name: "YouTube",
                url: "https://www.youtube.com/",
                icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F09%2FYouTube_full-color_icon_(2017).svg%2F2560px-YouTube_full-color_icon_(2017).svg.png&f=1&nofb=1&ipt=322d59662b32cb6e1a306b21ce32f17c1244dbe878adfcc53599b94e769ab60e&ipo=images",
            },
        };

        links = json_links.map(link => {
            console.log(link);
            const data = stuff[link.type];
            if (data) {
                return {
                    url: data.url + link.foreign_key,
                    icon: data.icon,
                    title: data.name,
                    description: "@" + link.foreign_key,
                }
            } else {
                return {
                    url: link.direct_url,
                    icon: "",
                    title: link.type,
                    description: link.foreign_url,
                }
            };
        });

        info = [{
            primary_color: "#fff",
            secondary_color: "#000",
            team_num: teamNum,
            team_full_name: json.nickname,
            pfp: json.website + "/favicon.ico",
            description: `If you are an administrator or member of Team ${teamNum}, you can add links to this page by reaching out.`,
            location: json.city + ", " + json.state_prov + ", " + json.country,
        }];
    }

    let results = {
        links: links,
        info: info,
        autofilled: !teamExists
    };
    return {
        data: results
    };

}