//@flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app: Object, commentDao: Object) {

    app.get('/comments/:post_id', (req, res) => {
        console.log('got get request in commentController');
        commentDao.getComments(req.params.post_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post('/add_comment', urlencodedParser, (req, res) => {
        console.log('got post request from add_post');
        commentDao.addComment(req.body, (status, data) => {
            res.status(status);
        })
    });
};