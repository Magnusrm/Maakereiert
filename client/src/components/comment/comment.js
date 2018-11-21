//@flow

import * as React from 'react';
import {Component} from 'react-simplified';

export class CommentCard extends Component <{ commenter: string, text: string, comment_date: string }> {
    date = new Date(this.props.comment_date);

    render() {
        return (
            <div className="card mx-3 mb-2 px-1">

                <h4 id="commenter">{this.props.commenter}</h4>
                <p id="comment_date" style={{color: 'grey'}}>commented: {this.props.comment_date}</p>
                <p id="text">{this.props.text}</p>
            </div>
        );
    }
}