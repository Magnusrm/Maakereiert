//@flow

const Dao = require("./dao.js");

module.exports = class PostDao extends Dao {

    getAll(callback: Function) {
        super.query(
            "select post_id, title, text, picture, picture_text, date_created, category, importance from post " +
            "where active = 1  AND importance = 1 " +
            "order by post_id desc",
            [],
            callback
        );
    }

    getCat(cat: string, callback: Function) {
        super.query(
            "select post_id, title, text, picture, picture_text, date_created, category, importance from post " +
            "where category=? AND active = 1 " +
            "order by post_id desc",
            [cat],
            callback
        );
    }

    getPost(post_id: number, callback: Function) {
        super.query(
            "select post_id, title, text, picture, picture_text, date_created, category from post " +
            "where post_id =? AND active = 1",
            [post_id],
            callback
        );
    }

    addPost(json: Object, callback: Function) {
        let val = [json.title, json.text, json.picture, json.picture_text, json.date_created, json.category, json.importance];
        super.query(
            "insert into post (title, text, picture, picture_text, date_created, category, importance, active) values(?, ?, ?, ?, ?, ?, ?, 1)",
            val,
            callback
        );
    }

    updatePost(post_id: number, json: Object, callback: Function) {
        let val = [json.title, json.text, json.picture, json.pictureText, json.category, json.importance, post_id];
        super.query(
            "update post set title =?, text =?, picture =?, picture_text=?, category=?, importance=? " +
            "where post_id = ?",
            val,
            callback
        );
    }


    deletePost(post_id: number, callback: Function) {
        super.query(
            "update post " +
            "set active = 0 " +
            "where post_id = ?",
            [post_id],
            callback
        );
    }
};