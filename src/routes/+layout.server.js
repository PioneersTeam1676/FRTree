import { mysqlConnection } from "$lib/db/mysql";
import { getTeam } from "$lib/db/sessions";
import { error } from "@sveltejs/kit";

export async function load({ params, cookies }) {

    const session = cookies.get("session");

    const teamAuthorized = getTeam(session);

    return {
        data: {
            loggedInAs: teamAuthorized
        }
    };

}