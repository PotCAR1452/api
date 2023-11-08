import { createPool } from "mysql2/promise";
import { DB_DATABASE } from "./config.js";
import { DB_HOST } from "./config.js";
import { DB_PASSWORD } from "./config.js";
import { DB_PORT } from "./config.js";
import { DB_USER } from "./config.js";

export let conn;

try {
    conn = createPool({
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
    });
} catch (error) {
    console.error(error);
}
