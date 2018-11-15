// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import {Alert} from './widgets';
//import { studentService } from './services';
import {postService, commentService} from './services';
import {PostCard} from './components/post/post';
//import {Category} from './components/category/category';
import {FeedCard} from './components/feed/feed';
import {NewPost} from './components/newpost/newpost';
import createHashHistory from 'history/createHashHistory';


// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}



const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-dark">


                <NavLink className="navbar-brand" style={{color: 'white'}} exact to="/home">
                    Måkereiret
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeStyle={{color: 'skyblue'}} to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link" activeStyle={{color: 'skyblue'}} to="/category/sport">
                                Sport
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link" activeStyle={{color: 'skyblue'}} to="/category/politikk">
                                Politikk
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link" activeStyle={{color: 'skyblue'}} to="/new_post">
                                Add post
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </nav>


            /*
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="nav-link" href="/">
                                Maakereiret
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Kategorier
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="/politikk">
                                                Politikk
                                            </a>
                                            <a className="dropdown-item" href="/sport">
                                                Sport
                                            </a>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/new_post">
                                            Add post
                                        </a>
                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                        */
        );
    }
}

class Home extends Component {
    posts = [];

    componentDidMount() {
        postService
            .getPosts()
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <FeedCard posts={this.posts}/>
            </div>
        )
    }
}

class Category extends Component <{ match: { params: { cat: string } } }> {
    posts = [];

    componentDidMount() {
        postService
            .getCat(this.props.match.params.cat)
            .then(posts => (this.posts = posts))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <FeedCard posts={this.posts}/>
            </div>
        )
    }
}

class PostView extends Component <{ match: { params: { post_id: number } } }> {
    post = null;
    comments = [];

    componentDidMount() {

        commentService
            .getComments(this.props.match.params.post_id)
            .then(comment => (this.comments = comment))
            .catch((error: Error) => Alert.danger(error.message));

        postService
            .getPost(this.props.match.params.post_id)
            .then(post => (this.post = post[0]))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        if (!this.post) return null;
        return (
            <div>
                <PostCard post_id={this.post.post_id} title={this.post.title} picture={this.post.picture}
                          picture_text={this.post.picture_text} text={this.post.text} comments={this.comments}/>
            </div>
        )
    }
}


/*
class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map(student => (
          <li key={student.email}>
            <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
              {student.firstName} {student.lastName}
            </NavLink>{' '}
            <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
              edit
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService
      .getStudents()
      .then(students => (this.students = students))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>First name: {this.student.firstName}</li>
          <li>Last name: {this.student.lastName}</li>
          <li>Email: {this.student.email}</li>
        </ul>
      </div>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <form>
        <ul>
          <li>
            First name:{' '}
            <input
              type="text"
              value={this.student.firstName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.firstName = event.target.value;
              }}
            />
          </li>
          <li>
            Last name:{' '}
            <input
              type="text"
              value={this.student.lastName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.lastName = event.target.value;
              }}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.student.email}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.email = event.target.value;
              }}
            />
          </li>
        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.student) return null;

    studentService
      .updateStudent(this.student)
      .then(() => {
        let studentList = StudentList.instance();
        if (studentList) studentList.mounted(); // Update Studentlist-component
        if (this.student) history.push('/students/' + this.student.id);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
*/
const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Alert/>
                <Menu/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/category/:cat" component={Category}/>
                <Route path="/new_post" component={NewPost}/>
                <Route exact path="/posts/:post_id(\d+)" component={PostView}/>
            </div>
        </HashRouter>,
        root
    );
