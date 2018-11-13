import * as React from 'react';
import {Component} from 'react-simplified';
import {PostCard} from '../post/post';

export class FeedCard extends Component<{ posts: Post[]}> {
    render() {
        return (
            <div>
                {
                    this.props.cat ? (
                        this.props.posts.filter(post => post.category === this.props.cat).map(post =>
                            <PostCard key={post.post_id} post_id={post.post_id} title={post.title} picture={post.picture}
                                      picture_text={post.picture_text}/>
                        )
                    ) : (
                        this.props.posts.map(post => (
                            <PostCard key={post.post_id} post_id={post.post_id} title={post.title} picture={post.picture}
                                      picture_text={post.picture_text}/>
                        ))
                    )
                }
            </div>
        );
    }
}