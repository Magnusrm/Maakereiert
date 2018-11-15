import mysql from 'mysql';
import PostDao from '../src/postDao';
import runsqlfile from 'runSQLFile';

// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

beforeAll(done => {
    runsqlfile("dao/createTables.sql", pool, () => {
        runsqlfile("dao/createTestData.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

