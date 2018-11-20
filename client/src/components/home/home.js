import {Component} from "react-simplified";
import {postService} from "../../services";
import {Alert} from "../../widgets";
import {FeedCard} from "../feed/feed";
import * as React from 'react';

export class Home extends Component {
    posts = [];

    componentDidMount() {
        postService
            .getPosts()
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div className="text-center">
                <h2 style={{color: 'skyblue'}}>
                    viktige saker
                </h2>
                <FeedCard posts={this.posts}/>
            </div>
        )
    }
}
