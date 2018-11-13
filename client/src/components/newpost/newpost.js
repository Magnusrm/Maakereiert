import * as React from 'react';
import {Component} from 'react-simplified';
import {postService} from '../../services';
import {Button} from '../../widgets';
import {Alert, Form} from "../../widgets";

export class NewPost extends Component {
/*
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            picture: '',
            pictureText: '',
            category: ''
        };
    }
*/
    title = '';
    text = '';
    picture = '';
    pictureText = '';
    dateCreated = '';
    category = '';
    form = null;


    render() {
        return (
            <div>
                <form ref={e => (this.form = e)}>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            placeholder="Enter title"
                            value={this.title}
                            onChange={evt => this.title = evt.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPicture">PictureAdress</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPicture"
                            placeholder="Picture adress"
                            value={this.picture}
                            onChange={evt => this.picture = evt.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPictureText">PictureText</label>
                        <input type="text"
                               className="form-control"
                               id="inputPictureText"
                               placeholder="Text about picture"
                               value={this.pictureText}
                               onChange={evt => this.pictureText = evt.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputText">Text</label>
                        <textarea
                            className="form-control"
                            id="inputText"
                            placeholder="Article text"
                            rows='3'
                            value={this.text}
                            onChange={evt => this.text = evt.target.value}
                        />
                    </div>

                    <div className="form-group" defaultValue={this.category} onChange={evt => this.category = evt.target.value}>
                        <select className="form-control">
                            <option>Default select</option>
                            <option>Sport</option>
                            <option>Politikk</option>
                            <option>Annet</option>
                        </select>
                    </div>

                    <Button onClick={this.create}>Submit</Button>
                </form>
            </div>
        );
    }
/*
    updateTitle(evt) {
        this.setState({
            title: evt.target.value
        });
    }

    updatePicture(evt) {
        this.setState({
            picture: evt.target.value
        });
    }

    updatePictureText(evt) {
        this.setState({
            pictureText: evt.target.value
        });
    }

    updateText(evt) {
        this.setState({
            text: evt.target.value
        });
    }

    updateCat(evt) {
        this.setState({
            category: evt.target.value
        });
    }

    */
    create() {
        console.log('create:');
        let newPost = {
            'title' : this.title,
            'text' : this.text,
            'picture' : this.picture,
            'pictureText' : this.pictureText,
            'category' : this.category
        };
        console.log(newPost);
        postService.addPost(newPost);
    }
}