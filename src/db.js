import { createPool } from "mysql2/promise";

export const conn = createPool({
    user: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    database: "DECOMUEBLES",
})

