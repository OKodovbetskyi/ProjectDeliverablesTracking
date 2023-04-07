import mysql from 'mysql2/promise';
//Database Connection
const dbConfig = {
    database: process.env.DB_NAME || 'PDMS',
    port: process.env.PORT || 3307,
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'alex',
    password: process.env.PASSWORD || '1234',
    namedPlaceholders: true

};
let connection;
try{
     connection = await mysql.createConnection(dbConfig);
} catch (error){
    console.log(`Error creating database connection: ${(error.message)}`)
    process.exit();
}
export default connection;