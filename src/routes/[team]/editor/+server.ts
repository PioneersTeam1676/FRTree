import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { getTeam } from "$lib/db/sessions";

export const POST: RequestHandler = async ({ request, cookies, params }) => {
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

    const json = await request.json();
    const { team_full_name, pfp, description, primary_col, secondary_col, location } = json;

    return error(200, "Temporary");
};