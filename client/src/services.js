// @flow
import axios from 'axios';
import {Post, Comment} from './types';

axios.interceptors.response.use(response => response.data);

/*
class Post {
    post_id: number;
    title: string;
    text: string;
    picture: string;
    picture_text: string;
    date_created: string;
    category: string;
    importance: string
}

class Comment {
    comment_id: number;
    commenter: string;
    text: string;
    comment_date: string;
    post_id: number;
}
*/

class PostService {
    getPosts(): Promise<Post[]> {
        return axios.get('/posts/');
    }

    getCat(cat: string): Promise<Post[]> {
        return axios.get('/category/' + cat);
    }

    getPost(post_id: number): Promise<Post[]> {
        return axios.get('/post/' + post_id);
    }

    addPost(newPost: Post): Promise<Response> {
        return axios.post('/add_post', newPost);
    }

    deletePost(post_id: number): Promise<Response> {
        return axios.put('/delete_post/' + post_id);
    }

    editPost(post: Post, post_id: number): Promise<Response> {
        return axios.put('/edit_post/' + post_id, post);
    }
}

class CommentService {
    addComment(newComment: Comment): Promise<Response> {
        return axios.post('/add_comment', newComment)
    }

    getComments(post_id: number): Promise<Comment[]> {
        return axios.get('/comments/' + post_id)
    }

    deleteComment(comment_id: number): Promise<Response> {
        return axios.put('delete_comment/' + comment_id);
    }

    deleteComments(post_id: number): Promise<Response> {
        return axios.put('/delete_post/' + post_id);
    }
}

export let postService = new PostService();
export let commentService = new CommentService();
