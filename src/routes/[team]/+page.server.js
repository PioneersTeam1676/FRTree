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

        links = json_links.map(link => {

            let url;
            let icon;

            if (link.type === "facebook-profile") {
                url = "https://www.facebook.com/" + link.foreign_key;
                icon = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F020%2F964%2F386%2Foriginal%2Ffacebook-circle-icon-for-web-design-free-png.png&f=1&nofb=1&ipt=8888f278e445a14d8cc21da16ff0667598481d17c53ed724b24634afee6775b4&ipo=images"
            }

            return {
                url: link.direct_url,
                icon: "",
                title: link.type,
                description: ""
            }
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