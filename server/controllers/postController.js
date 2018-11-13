let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app, postDao) {

    app.get('/posts', (req, res) => {
        console.log('got get request from');
        postDao.getAll((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/category/:cat', (req, res) => {
        console.log('got getCat request from');
        postDao.getCat(req.params.cat, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/post/:post_id', (req, res) => {
        console.log('got getPost request');
        postDao.getPost(req.params.post_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post('/add_post', urlencodedParser, (req, res) => {
        console.log('got post request from add_post');
        postDao.addPost(req.body, (status, data) => {
            res.status(status);
        })
    });

    app.get('/rediger_post', (req, res) => {
        res.render('rediger_post');
    });

    app.post('/rediger_post', (req, res) => {

    });

    app.delete('/rediger_post', (req, res) => {

    });

};