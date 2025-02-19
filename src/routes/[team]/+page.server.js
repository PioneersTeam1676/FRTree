import { mysqlConnection } from "$lib/db/mysql";

export async function load( { params }) {

    let connection = await mysqlConnection();

    try {

        // TODO: SQL INJECTION. SQL INJECTION. WARNING WARNING WARNING
        let links = await connection
            .query(`SELECT * FROM frclink_links WHERE team_num = ${params.team}`)
            .then(([rows, fields]) => {
                console.log(rows);
                return rows;
            });
        let info = await connection
            .query(`SELECT * FROM frclink_info WHERE team_num = ${params.team} LIMIT 1`)
            .then(([rows, fields]) => {
                console.log(rows);
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