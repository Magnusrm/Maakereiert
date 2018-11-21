//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';
import {Alert, Button} from '../../widgets';
import {postService} from '../../services';
import {CommentForm} from '../commentform/commentform';
import {Comment} from '../../types';

import createHashHistory from 'history/createHashHistory';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class PostCard extends Component <{ post_id: number, title: string, text?: string, picture: string, picture_text: string, date_created: string, comments?: Comment[] }> {

    render() {
        return (
            <div className="container col-8 text-center">
                {
                    this.props.text || this.props.comments ? (
                        <div>
                            <div className="card">
                                <picture>
                                    <img id="picture" className="card-img" src={this.props.picture} alt={this.props.picture_text} />
                                </picture>
                                <div className="container text-left">
                                    <h1 id="title">{this.props.title}</h1>
                                    <p id="date">Published: {this.props.date_created}</p>
                                    <hr/>
                                    <p id="text">{this.props.text}</p>
                                </div>
                            </div>

                            <Button onClick={this.delete} type="danger">Delete post</Button>
                            <NavLink className="btn btn-light" exact to={'/edit_post/' + this.props.post_id}>Edit
                                post</NavLink>
                            <div className="card text-left">
                                <h3>Comment this post:</h3>
                                <CommentForm post_id={this.props.post_id} comments={this.props.comments}/>
                            </div>
                        </div>

                    ) : (
                        <div className="card mb-2">
                            <picture>
                                <img id="picture2" className="card-img" src={this.props.picture} alt={this.props.picture_text} />
                            </picture>
                            <h1 id="title2">{this.props.title}</h1>
                            <hr/>
                            <NavLink id="postLink" className="btn btn-light" exact to={'/posts/' + this.props.post_id}>
                                Read ...
                            </NavLink>
                        </div>
                    )
                }
            </div>
        );
    }

    delete() {
        if (confirm('Er du sikker på at du vil slette posten?')) {
            postService
                .deletePost(this.props.post_id)
                .then(Alert.success('Post deleted successfully'))
                .then(history.push('/home/'))
                .catch((error: Error) => Alert.danger(error.message));

        } else {
            Alert.info('post ble ikke slettet')
        }
    }
}