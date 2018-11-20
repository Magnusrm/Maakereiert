import * as React from 'react';
import {Component} from "react-simplified";

export class Footer extends Component {
    render() {
        return (
            <div className="card-footer text-center bg-dark">
                <span>
                &copy;<p style={{color: 'skyblue'}}>magnusrm@stud.ntnu.no</p>
                </span>
            </div>
        );
    }
}