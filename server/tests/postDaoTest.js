import mysql from 'mysql';
import PostDao from '../src/postDao';
import CommentDao from '../src/commentDao';
import runsqlfile from './runSQLFile';

// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql",
    user: "root",
    password: "abc123",
    database: "testdb",
    debug: false,
    multipleStatements: true
});

let commentDao = new CommentDao(pool);
let postDao = new PostDao(pool);

beforeAll(done => {
    runsqlfile("tests/sqlFiles/createTables.sql", pool, () => {
        runsqlfile("tests/sqlFiles/createTestData.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});



//postDao tests

test("Get all active posts", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(7);
        expect(data[0].title).toBe("Test title9");
        done();
    }

    postDao.getAll(callback);
});




// commentDao tests

test("Get all comments from specified post", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(2);
        expect(data[0].commenter).toBe("Guy2");
        done();
    }

    commentDao.getComments(1, callback);
});