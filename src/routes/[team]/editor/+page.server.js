import { mysqlConnection } from "$lib/db/mysql";
import { getSessionBySessionId } from "$lib/db/sessions";
import { error } from "@sveltejs/kit";
import { responseError, responseSuccess, HTTP } from "$lib/apis";

export async function load({ params, cookies }) {

    const sessionId = cookies.get("sessionId");
    const teamNotNumber = params.team;
    const team = Number(teamNotNumber);

    if (!Number.isInteger(team)) {
        return error(HTTP.BAD_REQUEST, `team ${team} is not an integer`);
    }

    const session = getSessionBySessionId(sessionId);
    if (!session) {
        return error(HTTP.UNAUTHORIZED, `invalid session`);
    }

    const teamAuthorized = session.team_num;
    if (teamAuthorized !== team) {
        return error(HTTP.UNAUTHORIZED, `invalid session: only authorized as team ${teamAuthorized}`);
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
    } catch (error) {
        console.error("we got an error!")
        console.log(error)
        return error;
    }

}