import * as React from 'react';
import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';
import {Alert, Button} from '../../widgets';
import {postService} from '../../services';
import {CommentForm} from '../commentform/commentform';
import {CommentFeed} from '../commentfeed/commentfeed';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class PostCard extends Component <{ post_id: number, title: string, text?: string, picture: string, picture_text: string, date_created: string, comments?: Comment[]}> {

    render() {
        return (
            <div className="container">
                {
                    this.props.text ? (
                        <div>
                            <div className="card">
                                <picture>
                                    <img src={this.props.picture} alt={this.props.picture_text} width='450'
                                         height='300'/>
                                </picture>
                                <h1>{this.props.title}</h1>
                                <p>Published: {this.props.date_created}</p>
                                <hr/>
                                <p>{this.props.text}</p>

                            </div>

                            <Button onClick={this.delete} type="danger">Delete post</Button>

                            <div className="card">
                                <h3>Comment this post:</h3>
                                <CommentForm post_id={this.props.post_id}/>
                            </div>

                        </div>

                    ) : (
                        <div className="card">
                            <h1>{this.props.title}</h1>
                            <picture>
                                <img src={this.props.picture} alt={this.props.picture_text} width='450' height='300'/>
                            </picture>
                            <NavLink exact to={'/posts/' + this.props.post_id}>
                                Les saken ->
                            </NavLink>
                        </div>
                    )
                }

                {
                    this.props.comments && this.props.comments.length > 0 ? (
                        <div className="card">
                            <CommentFeed comments={this.props.comments}/>
                        </div>
                    ) : (
                        <p/>
                    )
                }
            </div>
        );
    }

    delete() {
        if(confirm('Er du sikker på at du vil slette posten?')) {
            postService
                .deletePost(this.props.post_id)
                .then(Alert.success('Post ble slettet'))
                .then(history.push('/home/'))
                .catch((error: Error) => Alert.danger(error.message));

        } else {
            Alert.info('post ble ikke slettet')
        }


    }
}