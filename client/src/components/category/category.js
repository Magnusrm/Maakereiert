import * as React from 'react';
import { Component } from 'react-simplified';
import {FeedCard} from "../feed/feed";

export class Category extends Component <{match: {params :{ cat: string}}}> {
    render() {
        return (
            <div>
                <FeedCard kat={this.props.match.params.cat}></FeedCard>
            </div>
        );
    }
}

