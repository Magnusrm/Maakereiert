
INSERT INTO post (post_id, title, text, picture, picture_text, date_created, category, importance, active)
values (1, 'Test title1', 'Article text1', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text1', '26/10/2018 13:45', 'sport', 1, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (2, 'Test title2', 'Article text2', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text2', '26/10/2018 13:45', 'sport', 1, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (3, 'Test title3', 'Article text3', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text3', '26/10/2018 13:45', 'sport', 1, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (4, 'Test title4', 'Article text4', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text4', '26/10/2018 13:45', 'politikk', 1, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (5, 'Test title5', 'Article text5', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text5', '26/10/2018 13:45', 'politikk', 1, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (6, 'Test title6', 'Article text6', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text6', '26/10/2018 13:45', 'sport', 2, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (7, 'Test title7', 'Article text7', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text7', '26/10/2018 13:45', 'sport', 2, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (8, 'Test title8', 'Article text8', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text8', '26/10/2018 13:45', 'sport', 1, 1);
INSERT INTO post (post_id,title, text, picture, picture_text, date_created, category, importance, active)
values (9, 'Test title9', 'Article text9', 'https://bornrealist.com/wp-content/uploads/2017/10/girl.jpg', 'picture text9', '26/10/2018 13:45', 'sport', 1, 1);


INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (1, 'Guy1', 'Comment text1', '26/10/2018 13:45', 1, 1);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (2, 'Guy2', 'Comment text2', '26/10/2018 13:45', 1, 1);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (3, 'Guy3', 'Comment text3', '26/10/2018 13:45', 1, 2);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (4, 'Guy4', 'Comment text4', '26/10/2018 13:45', 1, 2);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (5, 'Guy5', 'Comment text5', '26/10/2018 13:45', 1, 4);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (6, 'Guy6', 'Comment text6', '26/10/2018 13:45', 1, 4);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (7, 'Guy7', 'Comment text7', '26/10/2018 13:45', 1, 4);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (8, 'Guy8', 'Comment text8', '26/10/2018 13:45', 0, 7);
INSERT INTO comment (comment_id, commenter, text, comment_date, active, post_id)
values (9, 'Guy9', 'Comment text9', '26/10/2018 13:45', 0, 9);

