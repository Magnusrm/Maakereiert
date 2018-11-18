import mysql from 'mysql';
import CommentDao from '../src/commentDao';
import runsqlfile from './runSQLFile';

// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 40,
    host: "mysql",
    user: "root",
    password: "abc123",
    database: "testdb",
    debug: false,
    multipleStatements: true
});

let commentDao = new CommentDao(pool);

beforeAll(done => {
    runsqlfile("tests/sqlFiles/createTables.sql", pool, () => {
        runsqlfile("tests/sqlFiles/createTestData.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("Get all comments from specified post", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(2);
        expect(data[0].commenter).toBe("Guy1");
        done();
    }

    commentDao.getComments(1, callback);
});