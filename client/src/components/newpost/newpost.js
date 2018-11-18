import * as React from 'react';
import {Component} from 'react-simplified';
import {postService} from '../../services';
import {Button} from '../../widgets';
import {Alert, Form} from "../../widgets";

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


export class NewPost extends Component {

    title = '';
    text = '';
    picture = '';
    pictureText = '';
    category = '';
    importance = 0;
    form = null;


    render() {
        return (
            <div className="container">
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
                        <label htmlFor="inputCategory">Category</label>
                        <select className="form-control" id="inputCategory">
                            <option>Annet</option>
                            <option>Sport</option>
                            <option>Politikk</option>
                        </select>
                    </div>

                    <div className="form-group" defaultValue={this.importance} onChange={evt => this.importance = evt.target.value}>
                        <label htmlFor="inputImportance">Viktighet</label>
                        <select className="form-control" id="inputImportance">
                            <option value={0}>Viktighet</option>
                            <option value={1}>Viktig</option>
                            <option value={2}>Mindre viktig</option>
                        </select>
                    </div>

                    <Button onClick={this.create} type="primary">Submit</Button>
                </form>
            </div>
        );
    }

    create() {
        let time = new Date();
        let dateCreated = (time.getDay() + '/' + time.getMonth() + '/' + time.getFullYear() + ', ' + time.getHours() + ':' + time.getMinutes());

        let newPost = {
            'title' : this.title,
            'text' : this.text,
            'picture' : this.picture,
            'pictureText' : this.pictureText,
            'date_created' : dateCreated,
            'category' : this.category,
            'importance' : this.importance,
            'active' : 1
        };

        this.title = '';
        this.text = '';
        this.picture = '';
        this.pictureText = '';
        this.dateCreated = '';
        this.category = '';
        this.importance = 0;

        console.log(newPost);
        postService.addPost(newPost)
            .then(history.push('/home'))
            .catch((error: Error) => Alert.danger(error.message));
    }
}