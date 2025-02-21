import { mysqlConnection } from "$lib/db/mysql";
import { getTeam } from "$lib/db/sessions";
import { error } from "@sveltejs/kit";

export async function load( { params, cookies }) {

    const session = cookies.get("session");
        const teamNotNumber = params.team;
        const team = Number(teamNotNumber);
    
        if (!Number.isInteger(team)) {
            return error(400, `team ${team} is not an integer`);
        }
        
        const teamAuthorized = getTeam(session);
        if (teamAuthorized !== team) {
            return error(401, `invalid session`);
        }

    let connection = await mysqlConnection();
    
    try {
        let links = await connection
            .query(`SELECT * FROM frclink_links WHERE team_num = ?`, params.team)
            .then(([rows, fields]) => {
                return rows;
            });
        let info = await connection
            .query(`SELECT * FROM frclink_info WHERE team_num = ? LIMIT 1`, params.team)
            .then(([rows, fields]) => {
                return rows;
            });

        let results = {
            links: links,
            info: info
        };
        return {
            data: results
        };
    } catch(error) {
        console.error("we got an error!")
        console.log(error)
        return error;
    }

}