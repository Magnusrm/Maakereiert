//@flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from "react-simplified";
import {postService} from "../../services";
import {Alert} from "../../widgets";
import {NavLink} from "react-router-dom";

export class LiveFeed extends Component {

    posts = [];

    componentDidMount() {
        this.getCases();
        setInterval(this.getCases, 10000);
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
                            <NavLink id="postLink" key={post.post_id} exact to={'/posts/' + post.post_id}
                                     style={{color: 'black'}}><span>{'..............' + post.title + ', ' + post.date_created + '............'}</span></NavLink>
                        )}
                    </div>
                </marquee>
            </div>
        );
    }
}