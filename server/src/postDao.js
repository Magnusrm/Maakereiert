//@flow

const Dao = require("./dao.js");

module.exports = class PostDao extends Dao {

    getAll(callback: Function) {
        super.query(
            "select post_id, title, text, picture, picture_text, date_created, category from post " +
            "order by post_id desc",
            [],
            callback
        );
    }

    getCat(cat: string, callback: Function) {
        super.query(
            "select post_id, title, text, picture, picture_text, date_created, category from post " +
            "where category=? " +
            "order by post_id desc",
            [cat],
            callback
        );
    }

    getPost(post_id: number, callback: Function) {
        super.query(
            "select post_id, title, text, picture, picture_text, date_created, category from post " +
            "where post_id = ?",
            [post_id],
            callback
        );
    }

    addPost(json: JSON, callback: Function) {
        var val = [json.title, json.text, json.picture, json.pictureText, Date.now(), json.category];
        super.query(
            "insert into post (title, text, picture, picture_text, date_created, category) values(?, ?, ?, ?, ?, ?)",
            val,
            callback
        );
    }



    deleteOne(post_id: number, callback: Function) {
        super.query(
            "delete from post where post_id = ?",
            [post_id],
            callback
        );
    }
};