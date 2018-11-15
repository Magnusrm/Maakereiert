
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;

CREATE TABLE post(
    post_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45),
    text VARCHAR(10000),
    picture VARCHAR(225),
    picture_text VARCHAR(250)),
    date_created BIGINT,
    category VARCHAR(45),
    importance int(1),
    active int(1),
    PRIMARY KEY (post_id)
    );

CREATE TABLE comment(
    comment_id INT AUTO_INCREMENT NOT NULL,
    commenter VARCHAR(75),
    text VARCHAR(450),
    comment_date BIGINT,
    active INT(1),
    post_id INT NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
    );
