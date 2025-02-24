import { mysqlConnection } from "$lib/db/mysql";
import { getSessionBySessionId } from "$lib/db/sessions";
import { error } from "@sveltejs/kit";

export async function load({ params, cookies }) {

    const sessionId = cookies.get("sessionId");
    const session = getSessionBySessionId(sessionId);
    
    if (!session) {
        return {
            data: {
                loggedInAs: -1,
                loggedIn: false
            }
        }
    }
    
    const teamAuthorized = session.team_num;
    return {
        data: {
            loggedInAs: teamAuthorized,
            loggedIn: teamAuthorized !== -1
        }
    };

}