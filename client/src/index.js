// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import {Alert, Button} from './widgets';
//import { studentService } from './services';
import {EditPost} from './components/editpost/editpost';
import {postService, commentService} from './services';
import {PostCard} from './components/post/post';
//import {Category} from './components/category/category';
import {FeedCard} from './components/feed/feed';
import {NewPost} from './components/newpost/newpost';
import createHashHistory from 'history/createHashHistory';


// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}


const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{height: 80}}>


                <NavLink className="navbar-brand" style={{color: 'white', 'font-size': 50}} exact to="/home">
                    Måkereiret
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/category/sport">
                                Sport
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/category/politikk">
                                Politics
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/new_post">
                                Add post
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </nav>

        );
    }
}

class LiveFeed extends Component {

    posts = [];

    componentDidMount() {
        this.getCases();
        setInterval(this.getCases, 60000);
    }


    getCases = () => {
        postService
            .getPosts()
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    };

    render() {
        return (

            <div>
                <marquee truespeed="true" scrolldelay="45">
                    <div>
                        {this.posts.slice(0, 5).map(post =>

                            <NavLink key={post.post_id} exact to={'/posts/' + post.post_id}
                                     style={{color: 'black'}}><span>{'..............' + post.title + ', ' + post.date_created + '............'}</span></NavLink>
                        )}
                    </div>
                </marquee>
            </div>

        );
    }


}

class Home extends Component {
    posts = [];

    componentDidMount() {
        postService
            .getPosts()
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <FeedCard posts={this.posts}/>
            </div>
        )
    }
}

class Category extends Component <{ match: { params: { cat: string } } }> {
    posts = [];

    componentDidMount() {
        postService
            .getCat(this.props.match.params.cat)
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <FeedCard posts={this.posts}/>
            </div>
        )
    }
}

class PostView extends Component <{ match: { params: { post_id: number } } }> {
    post = null;
    comments = [];

    componentDidMount() {

        commentService
            .getComments(this.props.match.params.post_id)
            .then(comment => (this.comments = comment))
            .catch((error: Error) => Alert.danger(error.message));

        postService
            .getPost(this.props.match.params.post_id)
            .then(post => (this.post = post[0]))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        if (!this.post) return null;
        return (
            <div>
                <PostCard post_id={this.post.post_id} title={this.post.title} picture={this.post.picture}
                          picture_text={this.post.picture_text} text={this.post.text} comments={this.comments}
                          date_created={this.post.date_created}/>
            </div>
        )
    }
}

class Footer extends Component {
    render() {
        return (
            <div className="card-footer text-center bg-dark">
                <span>
                &copy;<p style={{color: 'skyblue'}}>magnusrm@stud.ntnu.no</p>
                </span>
            </div>
        );
    }
}

const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Alert/>
                <Menu/>
                <LiveFeed/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/category/:cat" component={Category}/>
                <Route path="/new_post" component={NewPost}/>
                <Route exact path="/posts/:post_id(\d+)" component={PostView}/>
                <Route exact path="/edit_post/:post_id(\d+)" component={EditPost}/>
                <Footer/>
            </div>
        </HashRouter>,
        root
    );
