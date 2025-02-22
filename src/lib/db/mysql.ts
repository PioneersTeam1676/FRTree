import mysql from "mysql2/promise";
import CREDS from "$lib/db/db.json"

let connection = null;

export function mysqlConnection() {
    
    if(!connection) {


        
        // CREDS looks like 
        // export default {
        // host: ***
        // user: ***
        // password: ***
        // database: ***
        // }
        connection = mysql.createConnection(CREDS);

    }

    return connection;

}