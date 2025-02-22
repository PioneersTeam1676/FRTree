import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { getTeam } from "$lib/db/sessions";
import { mysqlConnection } from "$lib/db/mysql";

export const POST: RequestHandler = async ({ request, params }) => {
    const json = await request.json();
    const { code, team_num, email, username, password, password_confirm } = json;

    // Make sure they sent the params
    if (!code || !team_num || !email || !username || !password || !password_confirm) {
        return error(400, "Missing parameters");
    }

    // Make sure params are valid
    if (password != password_confirm) {
        return error(400, "Passwords do not match");
    }

    const connection = await mysqlConnection();
    try {
        let joinCodes = await connection
            .query(`SELECT * FROM frclink_joincodes WHERE 'code' = ? AND 'team_num' = ? LIMIT 1`, [code, team_num])
            .then(([rows, fields]) => {
                return rows;
            });
        console.log("Join codes: ");
        console.log(joinCodes);
        if (joinCodes.length == 0) {
            return error(400, "No join codes found");
        }
    } catch (error) {
        console.trace("Error while fetching join codes");
        console.log(error);
        return error(500, error);
    }

    
    return new Response("Okay");
};