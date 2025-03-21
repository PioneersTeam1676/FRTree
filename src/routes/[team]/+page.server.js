import { mysqlConnection } from "$lib/db/mysql";
import { getTeamFromDB, getTeamFromTBA } from "$lib/db/teams";
import { error } from "@sveltejs/kit";
// import { TBA_KEY } from '$env/static/private';
let TBA_KEY = "va0mdQ50z5Oh5nLmYX6TQGUiNsMDHdLUHszu6vGRT8hpGEnzpcYFgJQ2iM6rHUVV	";

export async function load({ params }) {

    // check if team is a number
    const teamNum = Number(params.team);
    if (!Number.isInteger(teamNum)) {
        return error(400, "Team number must be an integer");
    }

    let team = await getTeamFromDB(teamNum);
    let autofilled = false;
    if (team === undefined) {
        team = await getTeamFromTBA(teamNum);
        autofilled = true;
    }
    
    return {
        data: {
            links: team.links,
            info: team.info,
            autofilled
        }
    };

}