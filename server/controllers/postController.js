//@flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app: Object, postDao: Object) {

    app.get('/posts/', (req, res) => {
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

    app.put('/delete_post/:post_id', (req, res) => {
        console.log('got delete request from service');
        postDao.deletePost(req.params.post_id, (status, data) => {
            res.status(status);
        })
    });

    app.put('/edit_post/:post_id', urlencodedParser, (req, res) => {
        console.log('got update request from service');
        postDao.updatePost(req.params.post_id, req.body, (status, data) => {
            res.status(status);
        })
    });


};