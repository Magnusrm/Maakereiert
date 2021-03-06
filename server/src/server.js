// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import mysql from 'mysql';

import PostDao from './postDao';
import CommentDao from './commentDao';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json


// connect to database
let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "magnusrm",
    password: "fKzwPFN3",
    database: "magnusrm",
    debug: false
});

let commentDao = new CommentDao(pool);
let postDao = new PostDao(pool);

// fire controllers
postController(app, postDao);
commentController(app, commentDao);

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
    app.listen(3000, error => {
        if (error) reject(error.message);
        console.log('Server started');
        resolve();
    });
});
