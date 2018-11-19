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
    picture_text = '';
    category = '';
    importance = 0;
    form = null;


    render() {
        return (
            <div className="container col-6">
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
                        <label htmlFor="inputPicture">Picture adress</label>
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
                        <label htmlFor="inputPictureText">Picture text</label>
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

                    <div className="form-row">
                        <div className="form-group col-6" defaultValue={this.category}
                             onChange={evt => this.category = evt.target.value}>
                            <label htmlFor="inputCategory">Category</label>
                            <select className="form-control" id="inputCategory">
                                <option value="Annet">Other</option>
                                <option value="Sport">Sport</option>
                                <option value="Politikk">Politics</option>
                            </select>
                        </div>

                        <div className="form-group col-6" defaultValue={this.importance}
                             onChange={evt => this.importance = evt.target.value}>
                            <label htmlFor="inputImportance">Importance</label>
                            <select className="form-control" id="inputImportance">
                                <option value={0}>Importance</option>
                                <option value={1}>Important</option>
                                <option value={2}>Less important</option>
                            </select>
                        </div>
                    </div>
                    <Button onClick={this.create} type="primary">Submit</Button>
                </form>
            </div>
        );
    }

    create() {
        let time = new Date();
        let dateCreated = (time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + ', ' + time.getHours() + ':' + time.getMinutes());

        let newPost = {
            'title': this.title,
            'text': this.text,
            'picture': this.picture,
            'pictureText': this.pictureText,
            'date_created': dateCreated,
            'category': this.category,
            'importance': this.importance,
            'active': 1
        };

        this.title = '';
        this.text = '';
        this.picture = '';
        this.picture_text = '';
        this.category = '';
        this.importance = 0;

        console.log(newPost);
        postService.addPost(newPost)
            .then(history.push('/home'))
            .then(Alert.info('Post created successfully'))
            .catch((error: Error) => Alert.danger(error.message));
    }
}