import { createPool } from "mysql2/promise";
import { config } from "../config/config";

const { dbHost, dbUser, dbDatabase } = config;

export const pool = createPool({
    host: dbHost,
    user: dbUser,
    database: dbDatabase,
    namedPlaceholders: true,
    decimalNumbers: true,
});