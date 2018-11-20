import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import * as React from 'react';


export class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">


                <NavLink className="navbar-brand" style={{color: 'white', 'font-size': 50}}
                         activeStyle={{color: 'skyblue'}}
                         exact to="/home">
                    Måkereiret
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse collapse.show" data-target="#navbarSupportedContent"
                     id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" data-target="#navbarSupportedContent">

                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/category/sport">
                                Sport
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/category/politikk">
                                Politics
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/category/annet">
                                Annet
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color: 'white', 'font-size': 25}}
                                     activeStyle={{color: 'skyblue'}} to="/new_post">
                                Add post
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}