//@flow

const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {

    getComments(post_id: number, callback: Function) {
        super.query(
            "select comment_id, commenter, text, comment_date, post_id from comment " +
            "where post_id = ? " +
            "order by comment_date desc",
            [post_id],
            callback
        );
    }

    addComment(json: JSON, callback: Function) {
        var val = [json.commenter, json.text, Date.now(), json.post_id];
        super.query(
            "insert into comment (commenter, text, comment_date, post_id) values(?, ?, ?, ?)",
            val,
            callback
        );
    }
};