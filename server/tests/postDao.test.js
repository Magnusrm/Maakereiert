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

let postDao = new PostDao(pool);

beforeAll(done => {
    runsqlfile("dao/createTables.sql", pool, () => {
        runsqlfile("dao/createTestData.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("Get all active posts", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(7);
        expect(data[0].title).toBe("Test title1");
        done();
    }

    postDao.getAll(callback);
});
