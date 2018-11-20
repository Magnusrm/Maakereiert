import * as React from 'react';
import {Component} from 'react-simplified';
import {commentService} from '../../services';
import {Button} from '../../widgets';
import {Alert} from "../../widgets";
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();

export class CommentForm extends Component <{post_id: number}> {

    commenter = '';
    text = '';

    validateForm = () => {
        return this.commenter !== '' &&
            this.text !== '';
    };

    render() {
        return (
            <div className="container">
                    <div className="form-group">
                        <label htmlFor="inputName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Name"
                            value={this.commenter}
                            onChange={evt => this.commenter = evt.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputComment">Comment</label>
                        <textarea
                            className="form-control"
                            id="inputComment"
                            placeholder="Comment text"
                            rows='3'
                            value={this.text}
                            onChange={evt => this.text = evt.target.value}
                        />
                    </div>

                    <Button onClick={this.create} type="primary">Submit</Button>

            </div>
        );
    }

    create() {
        if(this.validateForm()) {

            let time = new Date();
            let dateCreated = (time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + ', ' + time.getHours() + ':' + time.getMinutes());

            let newComment = {
                'commenter' : this.commenter,
                'text' : this.text,
                'comment_date' : dateCreated,
                'post_id' : this.props.post_id
            };
            this.commenter = "";
            this.text = "";
            commentService.addComment(newComment)
                .catch((error: Error) => Alert.danger(error.message));

        } else {
            Alert.danger('Write out your comment before submitting it!')
        }

    }
}