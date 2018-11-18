import * as React from 'react';
import {Component} from 'react-simplified';

export class CommentCard extends Component <{ commenter: string, text: string, comment_date: string }> {
    date = new Date(this.props.comment_date);

    render() {
        return (
            <div className="card">

                <h4>{this.props.commenter}</h4>
                <p>commented: {this.props.comment_date}</p>

                <p>{this.props.text}</p>
            </div>
        );
    }
}