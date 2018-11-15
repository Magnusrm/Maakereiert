// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);


class Post {
    post_id: number;
    title: string;
    text: string;
    picture: string;
    picture_text: string;
    date_created: string;
    category: string;
}

class PostService {
    getPosts(): Promise<Post[]> {
        return axios.get('/posts');
    }

    getCat(cat: string): Promise<Post[]> {
        return axios.get('/category/' + cat);
    }

    getPost(post_id: number): Promise<Post[]> {
        return axios.get('/post/' +  post_id);
    }

    addPost(newPost: Post): Promise<Response> {
        return axios.post('/add_post', newPost);
    }

}

class Comment {
    comment_id: number;
    commenter: string;
    text: string;
    comment_date: number;
    post_id: number;
}

class CommentService {
    addComment(newComment: Comment): Promise<Response> {
        return axios.post('/add_comment', newComment)
    }

    getComments(post_id: number): Promise<Comment[]> {
        return axios.get('/comments/' + post_id)
    }
}

export let postService = new PostService();
export let commentService = new CommentService();

/*

class Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

class StudentService {
  getStudents(): Promise<Student[]> {
    return axios.get('/students');
  }

  getStudent(id: number): Promise<Student> {
    return axios.get('/students/' + id);
  }

  updateStudent(student: Student): Promise<void> {
    return axios.put('/students', student);
  }
}
export let studentService = new StudentService();
*/