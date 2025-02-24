import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { getSessionBySessionId, type Session } from "$lib/db/sessions";
import { responseError, responseSuccess, HTTP } from "$lib/apis";

export const POST: RequestHandler = async ({ request, cookies, params }) => {
    const sessionId = cookies.get("session");
    const teamNotNumber = params.team;
    const team = Number(teamNotNumber);

    if (!Number.isInteger(team)) {
        return responseError(`team ${team} is not an integer`, HTTP.BAD_REQUEST);
    }
    
    const session: Session | undefined = getSessionBySessionId(sessionId);
    if (!session) {
        return responseError(`invalid sessionid`, HTTP.BAD_REQUEST);
    }

    const teamAuthorized = session.team_num;

    if (teamAuthorized !== team) {
        return responseError(`invalid session`, HTTP.UNAUTHORIZED);
    }

    const json = await request.json();
    const { team_full_name, pfp, description, primary_col, secondary_col, location } = json;

    return responseSuccess("Temporary", {});
};