INSERT INTO athleteapp.admin (email, username, password, role) VALUES
     ('admin.mail@mail.com', 'admin1', '$2a$12$kyaLfBHxYvGNtTJ.ezsaIOe4ibumbOFeAzl9MbFGhDNGI2x1s30xu', 'ADMIN');
INSERT INTO athleteapp.athlete (first_name, last_name, dob, sex, email, username, password, role) VALUES
    ('Markus', 'Siegert','2006-01-26', 'm', 'markus.siegert@mail.com', 'masi2006', 'pass4Masi', 'ATHLETE');

INSERT INTO athleteapp.exercise (exercise_title)
VALUES ('800m Lauf');

/*
INSERT INTO athleteap.rule (gender, from_age, to_age, value, metric, label, exercise_id)
VALUES ('M', 6, 7, 340, 'MINUTES', NULL, 1),
       ('M', 6, 7, 300, 'MINUTES', NULL, 2),
       ('M', 6, 7, 245, 'MINUTES', NULL, 3),
       ('M', 8, 9, 325, 'MINUTES', NULL, 1),
       ('M', 8, 9, 280, 'MINUTES', NULL, 2),
       ('M', 8, 9, 235, 'MINUTES', NULL, 3),
       ('M', 10, 11, 305, 'MINUTES', NULL, 1),
       ('M', 10, 11, 260, 'MINUTES', NULL, 2),
       ('M', 10, 11, 215, 'MINUTES', NULL, 3);
*/