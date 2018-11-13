let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app, commentDao) {

    app.get('/comments/:post_id', (req, res) => {
        console.log('got get request in commentController');
        commentDao.getComments((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

};