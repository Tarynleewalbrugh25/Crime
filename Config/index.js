import { createPool } from 'mysql2'; // Use mysql2 or mysql
import { config } from 'dotenv';
config();

const connection = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_Name,
    user: process.env.DB_UserName,   // Updated name to match .env file
    password: process.env.DB_UserPass, // Updated name to match .env file
    multipleStatements: true,
    connectionLimit: 30
});

export { connection };