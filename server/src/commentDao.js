//@flow

const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {

    getComments(post_id: number, callback: Function) {
        super.query(
            "select comment_id, commenter, text, post_id from comment " +
            "where post_id = ?",
            [post_id],
            callback
        );
    }

};