//@flow

export class Post {
    post_id: number;
    title: string;
    text: string;
    picture: string;
    picture_text: string;
    date_created: string;
    category: string;
    importance: number;


    constructor(post_id: number, title: string, text: string, picture: string, picture_text: string, date_created: string, category: string, importance: string) {
        this.post_id = post_id;
        this.title = title;
        this.text = text;
        this.picture = picture;
        this.picture_text = picture_text;
        this.date_created = date_created;
        this.category = category;
        this.importance = importance;
    }
}

export class Comment {
    comment_id: number;
    commenter: string;
    text: string;
    comment_date: string;
    post_id: number;

    constructor(comment_id: number, commenter: string, text: string, comment_date: string, post_id: number) {
        this.comment_id = comment_id;
        this.commenter = commenter;
        this.text = text;
        this.comment_date = comment_date;
        this.post_id = post_id;
    }
}