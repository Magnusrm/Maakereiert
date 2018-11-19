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
        expect(data.rows).toBe(6);
        expect(data[0].title).toBe("Test title9");
        done();
    }

    postDao.getAll(callback);
});

test("Get all active posts with specified category", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.rows).toBe(5);
        expect(data[0].title).toBe("Test title9");
        expect(data[0].category).toBe("sport");
        done();
    }

    postDao.getCat('sport', callback);
});

test("Get specified post", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.rows).toBe(1);
        expect(data[0].title).toBe("Test title6");
        done();
    }

    postDao.getPost(6, callback);
});

test("Add a post to database", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
    }

    let post = {
        title: 'TEST TITLE',
        text: 'TEST TEXT',
        picture: 'TEST PICTURE',
        picture_text: 'TEST PICTURE TEXT',
        date_created: 'TEST DATE',
        category: 'TEST CATEGORY',
        importance: 1,
        active: 1
    };

    postDao.addPost(post, callback);

    function callback2(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.rows).toBe(7);
        expect(data[0].title).toBe("TEST TITLE");
    }
    postDao.getAll(callback2);
    done();
});

test("Edit an existing post", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
    }

    let post = {
        title: 'TEST TITLE EDIT',
        text: 'TEST TEXT',
        picture: 'TEST PICTURE',
        picture_text: 'TEST PICTURE TEXT',
        category: 'TEST CATEGORY',
        importance: 1,
    };

    postDao.updatePost(9, post, callback);

    function callback2(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.rows).toBe(6);
        expect(data[0].title).toBe("TEST TITLE EDIT");
    }
    postDao.getAll(callback2);
    done();
});


// commentDao tests

test("Get all comments from specified post", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.rows).toBe(2);
        expect(data[0].commenter).toBe("Guy1");
        done();
    }

    commentDao.getComments(1, callback);
});