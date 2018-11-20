// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import {Alert} from './widgets';
import {EditPost} from './components/editpost/editpost';
import {NewPost} from './components/newpost/newpost';
import {Footer} from './components/footer/footer';
import {Category} from './components/category/category';
import {Menu} from './components/menu/menu';
import {PostView} from './components/article/article';
import {LiveFeed} from './components/livefeed/livefeed';
import {Home} from './components/home/home';
import createHashHistory from 'history/createHashHistory';


// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

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
