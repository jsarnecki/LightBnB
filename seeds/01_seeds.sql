INSERT INTO users (name, email, password)
VALUES ('Tim Guy', 'timguy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Greg Jennings', 'gjenningsyo@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Steve Carrall', 'itsstevvieboyy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Martha Stewert', 'heyladies@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'The Bumpin Spot', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 3425, 1, 3, 4, 'Canada', 'main street', 'Calgary', 'Alberta', 't8b2kr'),
(2, 'The Lovely spot', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-201121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121/pexels-photo-2128821.jpeg?auto=compress&cs=tinysrgb&h=350', 4536, 1, 2, 2, 'Canada', 'gregory street', 'Edmonton', 'Alberta', 't8b4kr'),
(3, 'The Ranch', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-29621.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121/pexels-photo-2781121.jpeg?auto=compress&cs=tinysrgb&h=3z50', 7421, 2, 1, 2, 'Canada', 'alt ave', 'Victoria', 'British Columbia', 'v5b2jr'),
(2, 'Yes Plz', 'description', 'https://images.pexels.com/photos/2157891/pexels-photo-201121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121/pexels-photo-2128008.jpeg?auto=compress&cs=tinysrgb&h=350', 9336, 3, 3, 6, 'Canada', 'Wall st', 'Vancouver', 'British Columbia', 'v6y8kr');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2014-10-21', '2014-10-21', 1, 1),
('2016-11-21', '2016-11-28', 2, 2),
('2017-1-2', '2017-1-8', 4, 3),
('2018-06-05', '2018-06-10', 3, 4),
('2019-07-06', '2019-07-14', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 2, 4, 4, 'message'),
(2, 1, 5, 2, 'message'),
(3, 2, 3, 3, 'message'),
(1, 3, 3, 1, 'message'),
(3, 4, 5, 5, 'message');