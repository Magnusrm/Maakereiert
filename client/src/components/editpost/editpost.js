//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {postService} from '../../services';
import {Button, Alert} from '../../widgets';
import {Post} from '../../types';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


export class EditPost extends Component <{ match: { params: { post_id: number } } }> {

    post = {};
    importanceChanged = false;
    categoryChanged = false;


    validateForm = () => {
        return this.post.title !== '' &&
            this.post.text !== '' &&
            this.post.picture !== '' &&
            this.post.picture_text !== '' &&
            this.post.category !== '' &&
            this.post.importance !== -1 &&
            this.importanceChanged &&
            this.categoryChanged;
    };

    componentDidMount() {

        postService
            .getPost(this.props.match.params.post_id)
            .then(post => (this.post = post[0]))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        if (!this.post) return null;
        return (
            <div className="container col-6">
                <div className="form-group">
                    <label htmlFor="inputTitle1">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTitle"
                        placeholder="Enter title"
                        value={this.post.title}
                        onChange={evt => this.post.title = evt.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPicture">PictureAdress</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPicture"
                        placeholder="Picture adress"
                        value={this.post.picture}
                        onChange={evt => this.post.picture = evt.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPictureText">PictureText</label>
                    <input type="text"
                           className="form-control"
                           id="inputPictureText"
                           placeholder="Text about picture"
                           value={this.post.picture_text}
                           onChange={evt => this.post.picture_text = evt.target.value}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputText">Text</label>
                    <textarea
                        className="form-control"
                        id="inputText"
                        placeholder="Article text"
                        rows='3'
                        value={this.post.text}
                        onChange={evt => this.post.text = evt.target.value}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-6" defaultValue={this.post.category}
                         onChange={evt => (this.post.category = evt.target.value) && (this.categoryChanged = true)}>
                        <label htmlFor="inputCategory">Category</label>
                        <select className="form-control" id="inputCategory">
                            <option value=''>Category</option>
                            <option value="Annet">Other</option>
                            <option value="Sport">Sport</option>
                            <option value="Politikk">Politics</option>
                        </select>
                    </div>

                    <div className="form-group col-6" defaultValue={this.post.importance}
                         onChange={evt => (this.post.importance = evt.target.value) && (this.importanceChanged = true)}>
                        <label htmlFor="inputImportance">Importance</label>
                        <select className="form-control" id="inputImportance">
                            <option value={-1}>Importance</option>
                            <option value={1}>Important</option>
                            <option value={2}>Less important</option>
                        </select>
                    </div>
                </div>
                <Button onClick={this.update} type="primary">Submit</Button>
            </div>
        );
    }

    update() {
        if (this.validateForm()) {
            let post = new Post(this.post.post_id, this.post.title, this.post.text, this.post.picture,
                this.post.picture_text, this.post.date_created, this.post.category,
                this.post.importance);
                /*
                {
                'post_id': this.post.post_id,
                'title': this.post.title,
                'text': this.post.text,
                'picture': this.post.picture,
                'picture_text': this.post.picture_text,
                'date_created': this.post.date_created,
                'category': this.post.category,
                'importance': this.post.importance
            };
*/
            console.log(post);
            postService.editPost(post, this.props.match.params.post_id)
                .then(history.push('/posts/' + this.props.match.params.post_id))
                .then(Alert.info('Post updated successfully'))
                .catch((error: Error) => Alert.danger(error.message));
        } else {
            Alert.danger("Fill out the form!")
        }

    }
}