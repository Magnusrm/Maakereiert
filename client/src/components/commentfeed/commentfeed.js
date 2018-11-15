import * as React from 'react';
import {Component} from 'react-simplified';
import {CommentCard} from '../comment/comment';

export class CommentFeed extends Component <{ comments: Comment[] }> {

    render() {
        return(
          <div>
              <h3>Comments:</h3>
              {
                  this.props.comments.map(comment =>
                      <CommentCard commenter={comment.commenter} text={comment.text} comment_date={comment.comment_date}/>
                  )
              }
          </div>
        );
    }
}