import { mysqlConnection } from "$lib/db/mysql";

export async function load( { params }) {

    let connection = await mysqlConnection();

    try {
        let results = await connection
            .query(`SELECT url, description, icon FROM frclink_links WHERE team_num = ${params.team}`)
            .then(([rows, fields]) => {
                console.log(rows);
                return rows;
            });

        return {
            data: results
        };
    } catch(error) {
        console.error("we got an error!")
        console.log(error)
        return error;
    }

}