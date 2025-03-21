import { getTeamFromTBA } from "./teams";
import { mysqlConnection } from "./mysql";

const teamsToPull = [1676, 3142, 8513, 1811, 834, 219, 222, 7045, 1672, 1640, 56, 303, 555, 714, 752, 1279, 2180, 4285, 5310, 6860, 8075, 8588, 8628, 8630, 8706, 8707, 8771, 9424, 9439, 10069, 10480, 10600];
const connection = await mysqlConnection();

for (let i = 2; i < 4; i++) {
    const teamId = teamsToPull[i];
    const team = await getTeamFromTBA(teamId);
    const info = team.info[0];
    
    connection.query("INSERT INTO frclink_info (team_num, team_full_name, pfp, description, uid, primary_col, secondary_col, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        teamId, info.team_full_name, info.pfp, info.description, -1, info.primary_color, info.secondary_color, info.location
    ]);

    const links = team.links;
    for (const link of links) {
        connection.query("INSERT INTO frclink_links (team_num, icon, description, url, uid, title) VALUES (?, ?, ?, ?, ?, ?)", [
            teamId, link.icon, link.description, link.url, -1, link.title
        ]);
    }
}

console.log("Okay you can ^C because this script doesn't stop running for some reason");