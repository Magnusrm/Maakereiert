import * as React from 'react';
import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';

export class PostCard extends Component <{ post_id: number, title: string, text?: string, picture: string, picture_text: string }> {


    render() {
        return (
            <div>
                {
                    this.props.text ? (
                        <div className="card">
                            <h1>{this.props.title}</h1>
                            <picture>
                                <img src={this.props.picture} alt={this.props.picture_text} width='450' height='300'/>
                            </picture>
                            <p>{this.props.text}</p>
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
            </div>
        );
    }
}