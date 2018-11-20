import * as React from 'react';
import {Component} from 'react-simplified';
import {commentService, postService} from "../../services";
import {Alert} from "../../widgets";
import {PostCard} from "../post/post";

export class PostView extends Component <{ match: { params: { post_id: number } } }> {
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