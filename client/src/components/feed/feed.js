//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {PostCard} from '../post/post';
import {Button} from '../../widgets';
import {Post} from '../../types';

export class FeedCard extends Component<{ posts: Post[] }> {
    limit = 5;

    render() {
        return (
            <div className="container">
                {

                    this.props.posts.slice(0, this.limit).map(post => (
                            <PostCard id="postCard2" key={post.post_id} post_id={post.post_id} title={post.title}
                                      picture={post.picture}
                                      picture_text={post.picture_text} date_created={post.date_created}/>
                        )
                    )
                }

                {
                    this.limit < this.props.posts.length ? (
                        <Button onClick={this.update} type="primary">Load more posts</Button>
                    ) : (
                        <p/>
                    )
                }

                <p id="nrPosts">Showing {this.props.posts.slice(0, this.limit).length} of {this.props.posts.length} results.</p>
            </div>
        );
    }

    update() {
        this.limit += 5;
    };
}