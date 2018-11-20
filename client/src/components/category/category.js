import * as React from 'react';
import { Component } from 'react-simplified';
import {FeedCard} from "../feed/feed";
import {postService} from "../../services";
import {Alert} from "../../widgets";

export class Category extends Component <{ match: { params: { cat: string } } }> {
    posts = [];

    componentDidMount() {
        postService
            .getCat(this.props.match.params.cat)
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div className="text-center">
                <h2 id="category" style={{color: 'skyblue'}}>
                    {this.props.match.params.cat}
                </h2>

                <FeedCard id="feedCard" posts={this.posts}/>
            </div>
        )
    }
}