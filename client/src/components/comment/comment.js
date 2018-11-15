import * as React from 'react';
import {Component} from 'react-simplified';

export class CommentCard extends Component <{ commenter: string, text: string, comment_date: number }> {
    date = new Date(this.props.comment_date);

    render() {
        return (
            <div className="card">

                <h4>{this.props.commenter}</h4>
                <p>commented: {this.date.getDay()}.{this.date.getMonth()}.{this.date.getFullYear()}, {this.date.getHours()}:{this.date.getMinutes()}</p>

                <p>{this.props.text}</p>
            </div>
        );
    }
}