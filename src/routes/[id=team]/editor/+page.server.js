import { mysqlConnection, mysqlPool } from "$lib/db/mysql";
import { getSessionBySessionId } from "$lib/db/sessions";
import { error, redirect } from "@sveltejs/kit";
import { responseError, responseSuccess, HTTP } from "$lib/apis";

export async function load({ params, cookies }) {

    const sessionId = cookies.get("sessionId");
    const teamNotNumber = params.id;
    // console.log(params);
    const team = Number(teamNotNumber);

    if (!Number.isInteger(team)) {
        return error(HTTP.BAD_REQUEST, `team ${team} is not an integer`);
    }

    const session = getSessionBySessionId(sessionId);
    if (!session) {
        // throw redirect(302, "/sign_in");
        return error(HTTP.UNAUTHORIZED, `invalid session`);
    }
    
    const teamAuthorized = session.team_num;
    const admin = session.user.flag_is_admin === 1;
    if (!admin && teamAuthorized !== team) {
        // throw redirect(302, "/sign_in");
        return error(HTTP.UNAUTHORIZED, `invalid session: only authorized as team ${teamAuthorized}`);
    }

    const isAdmin = session.user.flag_is_admin === 1;

    // let connection = await mysqlConnection();
    let connection = await mysqlPool();
    

    try {
        let links = await connection
            .query(`SELECT * FROM frclink_links WHERE team_num = ?`, params.id)
            .then(([rows, fields]) => {
                return rows;
            });
        let info = await connection
            .query(`SELECT * FROM frclink_info WHERE team_num = ? LIMIT 1`, params.id)
            .then(([rows, fields]) => {
                return rows;
            });

        let results = {
            links: links,
            info: info,
            isAdmin: isAdmin,
        };
        return {
            data: results,
            teamNum: team,
        };
    } catch (error) {
        console.error("we got an error!")
        console.log(error)
        return error;
    }

}