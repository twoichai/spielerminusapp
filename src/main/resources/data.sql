INSERT INTO admin (email, username, password, role)
VALUES ('admin.mail@mail.com', 'admin', '$2a$12$kyaLfBHxYvGNtTJ.ezsaIOe4ibumbOFeAzl9MbFGhDNGI2x1s30xu', 'ADMIN');

INSERT INTO athlete (first_name, last_name, dob, sex, email, username, password, role, schwimmnachweis)
VALUES ('Markus', 'Schmidt', '2012-01-26 00:00:00.000', 'M', 'markus.schmidt@mail.com', 'masi2006',
        '$2a$12$EV3sZWrj5yPLP4aswTmSMesBDDSkMdTshpNdQpq6rTYSKPgOLLTmS', 'ATHLETE', false);

INSERT INTO completed_exercises (date_completed, earned_points, athlete_id, exercise_id, id, dbs, exercise_type, medal,
                                 result)
VALUES ('2024-05-26 00:00:00.000', 1, 1, 1, 1, "test", 'AUSDAUER', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 2, 2, "test", 'AUSDAUER', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 3, 3, "test", 'AUSDAUER', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 4, 4, "test", 'AUSDAUER', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 5, 5, "test", 'KRAFT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 6, 6, "test", 'KRAFT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 7, 7, "test", 'KRAFT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 8, 8, "test", 'KRAFT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 9, 9, "test", 'SCHNELLIGKEIT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 10, 10, "test", 'SCHNELLIGKEIT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 11, 11, "test", 'SCHNELLIGKEIT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 12, 12, "test", 'SCHNELLIGKEIT', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 13, 13, "test", 'KOORDINATION', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 14, 14, "test", 'KOORDINATION', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 15, 15, "test", 'KOORDINATION', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 16, 16, "test", 'KOORDINATION', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 17, 17, "test", 'KOORDINATION', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 18, 18, "test", 'KOORDINATION', "GOLD", 69),
       ('2024-05-26 00:00:00.000', 1, 1, 19, 19, "test", 'KOORDINATION', "GOLD", 69);

INSERT INTO exercise (exercise_id, exercise_title, exercise_type)
VALUES (1, '800m Lauf','AUSDAUER'),
       (2, 'Dauer-/Gelaendelauf','AUSDAUER'),
       (3, 'Schwimmen','AUSDAUER'),
       (4, 'Radfahren','AUSDAUER'),
       (5, 'Werfen','KRAFT'),
       (6, 'Kugelstossen','KRAFT'),
       (7, 'Standweitsprung','KRAFT'),
       (8, 'Geraeteturnen Kraft','KRAFT'),
       (9, 'Laufen','SCHNELLIGKEIT'),
       (10, '25 m Schwimmen','SCHNELLIGKEIT'),
       (11, '200 m Radfahren','SCHNELLIGKEIT'),
       (12, 'Geraeteturnen Schnelligkeit','SCHNELLIGKEIT'),
       (13, 'Hochsprung','KOORDINATION'),
       (14, 'Weitsprung','KOORDINATION'),
       (15, 'Zonenweitsprung','KOORDINATION'),
       (16, 'Drehwurf','KOORDINATION'),
       (17, 'Schleuderball','KOORDINATION'),
       (18, 'Seilspringen','KOORDINATION'),
       (19, 'Geraetturnen Koordination','KOORDINATION');
VALUES (1, '800m Lauf', 'AUSDAUER'),
       (2, 'Dauer-/Geländelauf', 'AUSDAUER'),
       (3, 'Schwimmen', 'AUSDAUER'),
       (4, 'Radfahren', 'AUSDAUER'),
       (5, 'Werfen', 'KRAFT'),
       (6, 'Kugelstoßen', 'KRAFT'),
       (7, 'Standweitsprung', 'KRAFT'),
       (8, 'Geräteturnen Kraft', 'KRAFT'),
       (9, 'Laufen', 'SCHNELLIGKEIT'),
       (10, '25 m Schwimmen', 'SCHNELLIGKEIT'),
       (11, '200 m Radfahren', 'SCHNELLIGKEIT'),
       (12, 'Geräteturnen Schnelligkeit', 'SCHNELLIGKEIT'),
       (13, 'Hochsprung', 'KOORDINATION'),
       (14, 'Weitsprung', 'KOORDINATION'),
       (15, 'Zonenweitsprung', 'KOORDINATION'),
       (16, 'Drehwurf', 'KOORDINATION'),
       (17, 'Schleuderball', 'KOORDINATION'),
       (18, 'Seilspringen', 'KOORDINATION'),
       (19, 'Gerätturnen Koordination', 'KOORDINATION');



INSERT INTO rule (gender, from_age, to_age, value_bronze, value_silver, value_gold, metric, label, exercise_id)
VALUES ('M', 6, 7, 540, 500, 415, 'MINUTES', NULL, 1), -- 800m Lauf --
       ('M', 8, 9, 525, 440, 355, 'MINUTES', NULL, 1),
       ('M', 10, 11, 505, 420, 335, 'MINUTES', NULL, 1),
       ('M', 12, 13, 445, 400, 315, 'MINUTES', NULL, 1),
       ('M', 14, 15, 420, 340, 300, 'MINUTES', NULL, 1),
       ('M', 16, 17, 405, 325, 245, 'MINUTES', NULL, 1),

       ('W', 6, 7, 540, 500, 415, 'MINUTES', NULL, 1),
       ('W', 8, 9, 535, 450, 410, 'MINUTES', NULL, 1),
       ('W', 10, 11, 520, 440, 400, 'MINUTES', NULL, 1),
       ('W', 12, 13, 510, 425, 345, 'MINUTES', NULL, 1),
       ('W', 14, 15, 500, 420, 335, 'MINUTES', NULL, 1),
       ('W', 16, 17, 450, 405, 325, 'MINUTES', NULL, 1),

       ('M', 6, 7, 1000, 1500, 2000, 'MINUTES', NULL, 2), -- Dauer-/Geländelauf --
       ('M', 8, 9, 1200, 1700, 2300, 'MINUTES', NULL, 2),
       ('M', 10, 11, 1700, 2500, 3500, 'MINUTES', NULL, 2),
       ('M', 12, 13, 2500, 3500, 4500, 'MINUTES', NULL, 2),
       ('M', 14, 15, 3500, 4500, 6000, 'MINUTES', NULL, 2),
       ('M', 16, 17, 5500, 7000, 9000, 'MINUTES', NULL, 2),

       ('W', 6, 7, 800, 1200, 1700, 'MINUTES', NULL, 2),
       ('W', 8, 9, 1000, 1500, 2000, 'MINUTES', NULL, 2),
       ('W', 10, 11, 1500, 2000, 3000, 'MINUTES', NULL, 2),
       ('W', 12, 13, 2000, 3000, 4000, 'MINUTES', NULL, 2),
       ('W', 14, 15, 3000, 4000, 5000, 'MINUTES', NULL, 2),
       ('W', 16, 17, 4500, 6000, 7500, 'MINUTES', NULL, 2),

       ('M', 6, 7, 900, 720, 610, 'MINUTES', '200 m', 3), -- Schwimmen --
       ('M', 8, 9, 800, 645, 540, 'MINUTES', '200 m', 3),
       ('M', 10, 11, 700, 620, 510, 'MINUTES', '200 m', 3),
       ('W', 6, 7, 900, 740, 620, 'MINUTES', '200 m', 3),
       ('W', 8, 9, 800, 700, 555, 'MINUTES', '200 m', 3),
       ('W', 10, 11, 720, 625, 530, 'MINUTES', '200 m', 3),


       ('M', 12, 13, 1330, 1130, 945, 'MINUTES', '400 m', 3),
       ('M', 14, 15, 1200, 1015, 850, 'MINUTES', '400 m', 3),
       ('M', 16, 17, 1100, 940, 820, 'MINUTES', '400 m', 3),
       ('W', 12, 13, 1450, 1255, 1100, 'MINUTES', '400 m', 3),
       ('W', 14, 15, 1305, 1140, 1000, 'MINUTES', '400 m', 3),
       ('W', 16, 17, 1150, 1030, 905, 'MINUTES', '400 m', 3),

       ('M', 6, 7, 0, 0, 0, 'MINUTES', NULL, 4), -- Radfahren --
       ('W', 6, 7, 0, 0, 0, 'MINUTES', NULL, 4),

       ('M', 8, 9, 2630, 2330, 2030, 'MINUTES', '5 km', 4),
       ('W', 8, 9, 2700, 2400, 2100, 'MINUTES', '5 km', 4),

       ('M', 10, 11, 4830, 4100, 3330, 'MINUTES', '10 km', 4),
       ('M', 12, 13, 4300, 3700, 3130, 'MINUTES', '10 km', 4),
       ('M', 14, 15, 3200, 2800, 2400, 'MINUTES', '10 km', 4),
       ('M', 16, 17, 2700, 2330, 2030, 'MINUTES', '10 km', 4),
       ('W', 10, 11, 5030, 4300, 3530, 'MINUTES', '10 km', 4),
       ('W', 12, 13, 4500, 3930, 3330, 'MINUTES', '10 km', 4),
       ('W', 14, 15, 3800, 3230, 2830, 'MINUTES', '10 km', 4),
       ('W', 16, 17, 3230, 2830, 2500, 'MINUTES', '10 km', 4),

       ('M', 6, 7, 1200, 1500, 1700, 'METERS', 'Schlagball (80 g)', 5), -- Werfen --
       ('M', 8, 9, 1700, 2000, 2300, 'METERS', 'Schlagball (80 g)', 5),
       ('M', 10, 11, 2100, 2500, 2800, 'METERS', 'Schlagball (80 g)', 5),
       ('W', 6, 7, 600, 900, 1200, 'METERS', 'Schlagball (80 g)', 5),
       ('W', 8, 9, 900, 1200, 1500, 'METERS', 'Schlagball (80 g)', 5),
       ('W', 10, 11, 1100, 1500, 1800, 'METERS', 'Schlagball (80 g)', 5),

       ('M', 12, 13, 2600, 3000, 3300, 'METERS', 'Wurfball (200 g)', 5),
       ('M', 14, 15, 3000, 3400, 3700, 'METERS', 'Wurfball (200 g)', 5),
       ('M', 16, 17, 3400, 3800, 4200, 'METERS', 'Wurfball (200 g)', 5),
       ('W', 12, 13, 1500, 1800, 2200, 'METERS', 'Wurfball (200 g)', 5),
       ('W', 14, 15, 2000, 2400, 2700, 'METERS', 'Wurfball (200 g)', 5),
       ('W', 16, 17, 2400, 2700, 3100, 'METERS', 'Wurfball (200 g)', 5),

       ('M', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 6), -- Kugelstoßen --
       ('M', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 6),
       ('M', 10, 11, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 10-11 moeglich', 6),
       ('W', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 6),
       ('W', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 6),
       ('W', 10, 11, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 10-11 moeglich', 6),
       ('M', 12, 13, 625, 675, 725, 'METERS', '3 kg', 6),
       ('W', 12, 13, 475, 525, 575, 'METERS', '3 kg', 6),
       ('W', 14, 15, 550, 600, 650, 'METERS', '3 kg', 6),
       ('W', 16, 17, 575, 625, 675, 'METERS', '3 kg', 6),
       ('M', 14, 15, 700, 750, 800, 'METERS', '4 kg', 6),
       ('M', 16, 17, 750, 800, 850, 'METERS', '5 kg', 6),

       ('M', 6, 7, 115, 135, 150, 'METERS', NULL, 7),                             -- Standweitsprung --
       ('M', 8, 9, 130, 150, 165, 'METERS', NULL, 7),
       ('M', 10, 11, 150, 170, 185, 'METERS', NULL, 7),
       ('M', 12, 13, 170, 190, 205, 'METERS', NULL, 7),
       ('M', 14, 15, 190, 205, 225, 'METERS', NULL, 7),
       ('M', 16, 17, 205, 220, 240, 'METERS', NULL, 7),

       ('W', 6, 7, 105, 125, 140, 'METERS', NULL, 7),
       ('W', 8, 9, 115, 130, 150, 'METERS', NULL, 7),
       ('W', 10, 11, 130, 145, 165, 'METERS', NULL, 7),
       ('W', 12, 13, 140, 160, 180, 'METERS', NULL, 7),
       ('W', 14, 15, 155, 170, 190, 'METERS', NULL, 7),
       ('W', 16, 17, 165, 180, 200, 'METERS', NULL, 7),

       ('M', 6, 7, 1, 2, 3, 'POINTS', 'Boden', 8),                                -- Geräteturnen Kraft --
       ('M', 8, 9, 1, 2, 3, 'POINTS', 'Boden', 8),
       ('W', 6, 7, 1, 2, 3, 'POINTS', 'Boden', 8),
       ('W', 8, 9, 1, 2, 3, 'POINTS', 'Boden', 8),
       ('M', 10, 11, 1, 2, 3, 'POINTS', 'Barren', 8),
       ('W', 10, 11, 1, 2, 3, 'POINTS', 'Barren', 8),
       ('M', 12, 13, 1, 2, 3, 'POINTS', 'Reck', 8),
       ('W', 12, 13, 1, 2, 3, 'POINTS', 'Reck', 8),
       ('M', 16, 17, 1, 2, 3, 'POINTS', 'Reck', 8),
       ('W', 16, 17, 1, 2, 3, 'POINTS', 'Reck', 8),
       ('M', 14, 15, 1, 2, 3, 'POINTS', 'Boden', 8),
       ('W', 14, 15, 1, 2, 3, 'POINTS', 'Boden', 8),


       ('M', 6, 7, 77, 68, 60, 'SECONDS', '30 m', 9),                             -- Laufen: Sprint --
       ('M', 8, 9, 72, 64, 57, 'SECONDS', '30 m', 9),
       ('W', 6, 7, 80, 71, 63, 'SECONDS', '30 m', 9),
       ('W', 8, 9, 74, 66, 57, 'SECONDS', '30 m', 9),

       ('M', 10, 11, 103, 93, 84, 'SECONDS', '50 m', 9),
       ('M', 12, 13, 97, 89, 81, 'SECONDS', '50 m', 9),
       ('W', 10, 11, 110, 101, 91, 'SECONDS', '50 m', 9),
       ('W', 12, 13, 106, 96, 85, 'SECONDS', '50 m', 9),

       ('M', 14, 15, 170, 154, 141, 'SECONDS', '100 m', 9),
       ('M', 16, 17, 163, 148, 135, 'SECONDS', '100 m', 9),
       ('W', 14, 15, 186, 170, 155, 'SECONDS', '100 m', 9),
       ('W', 16, 17, 176, 163, 150, 'SECONDS', '100 m', 9),

       ('M', 6, 7, 460, 380, 300, 'SECONDS', NULL, 10),                           -- 25 m Schwimmen --
       ('M', 8, 9, 410, 330, 260, 'SECONDS', NULL, 10),
       ('M', 10, 11, 360, 290, 225, 'SECONDS', NULL, 10),
       ('M', 12, 13, 330, 270, 210, 'SECONDS', NULL, 10),
       ('M', 14, 15, 310, 255, 200, 'SECONDS', NULL, 10),
       ('M', 16, 17, 295, 245, 190, 'SECONDS', NULL, 10),

       ('W', 6, 7, 466, 385, 305, 'SECONDS', NULL, 10),
       ('W', 8, 9, 420, 340, 280, 'SECONDS', NULL, 10),
       ('W', 10, 11, 390, 315, 255, 'SECONDS', NULL, 10),
       ('W', 12, 13, 350, 290, 235, 'SECONDS', NULL, 10),
       ('W', 14, 15, 330, 275, 215, 'SECONDS', NULL, 10),
       ('W', 16, 17, 305, 255, 200, 'SECONDS', NULL, 10),

       ('M', 6, 7, -1, -1, -1, 'SECONDS', 'Nicht fuer das Alter 6-7 moeglich', 11), -- 200 m Radfahren --
       ('W', 6, 7, -1, -1, -1, 'SECONDS', 'Nicht fuer das Alter 6-7 moeglich', 11),
       ('M', 8, 9, 380, 330, 280, 'SECONDS', NULL, 11),
       ('M', 10, 11, 350, 305, 260, 'SECONDS', NULL, 11),
       ('M', 12, 13, 295, 260, 225, 'SECONDS', NULL, 11),
       ('M', 14, 15, 240, 215, 190, 'SECONDS', NULL, 11),
       ('M', 16, 17, 220, 195, 170, 'SECONDS', NULL, 11),


       ('W', 8, 9, 410, 360, 310, 'SECONDS', NULL, 11),
       ('W', 10, 11, 370, 320, 270, 'SECONDS', NULL, 11),
       ('W', 12, 13, 310, 270, 235, 'SECONDS', NULL, 11),
       ('W', 14, 15, 270, 245, 215, 'SECONDS', NULL, 11),
       ('W', 16, 17, 250, 225, 200, 'SECONDS', NULL, 11),

       ('M', 6, 7, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('W', 6, 7, 1, 2, 3, 'POINTS', 'Sprung', 12),-- Geräteturnen Schnelligkeit --
       ('M', 8, 9, 1, 2, 3, 'POINTS', 'Boden', 12),
       ('W', 8, 9, 1, 2, 3, 'POINTS', 'Boden', 12),

       ('M', 10, 11, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('M', 12, 13, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('M', 14, 15, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('M', 16, 17, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('W', 10, 11, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('W', 12, 13, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('W', 14, 15, 1, 2, 3, 'POINTS', 'Sprung', 12),
       ('W', 16, 17, 1, 2, 3, 'POINTS', 'Sprung', 12),

       ('M', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 13), -- Hochsprung  -- starts with 0, what to do?
       ('M', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 13),
       ('W', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 13),
       ('W', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 13),
       ('M', 10, 11, 0.85, 0.95, 1.05, 'METERS', NULL, 13),
       ('M', 12, 13, 0.95, 1.05, 1.15, 'METERS', NULL, 13),
       ('M', 14, 15, 1.10, 1.20, 1.30, 'METERS', NULL, 13),
       ('M', 16, 17, 1.20, 1.30, 1.40, 'METERS', NULL, 13),

       ('W', 10, 11, 0.8, 0.9, 1.0, 'METERS', NULL, 13),
       ('W', 12, 13, 0.9, 1.0, 1.10, 'METERS', NULL, 13),
       ('W', 14, 15, 0.95, 1.05, 1.15, 'METERS', NULL, 13),
       ('W', 16, 17, 1.05, 1.15, 1.25,  'METERS', NULL, 13),

       ('M', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 14), -- Weitsprung
       ('M', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 14),
       ('W', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 14),
       ('W', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 14),
       ('M', 10, 11, 260, 290, 320, 'METERS', NULL, 14),
       ('M', 12, 13, 320, 350, 380, 'METERS', NULL, 14),
       ('M', 14, 15, 380, 410, 440, 'METERS', NULL, 14),
       ('M', 16, 17, 430, 460, 490, 'METERS', NULL, 14),

       ('W', 10, 11, 230, 260, 290, 'METERS', NULL, 14),
       ('W', 12, 13, 280, 310, 340, 'METERS', NULL, 14),
       ('W', 14, 15, 320, 350, 380, 'METERS', NULL, 14),
       ('W', 16, 17, 340, 370, 400, 'METERS', NULL, 14),

       ('M', 6, 7, 18, 21, 24, 'CUSTOM', 'Zonenweitsprung', 15), -- Zonenweitsprung
       ('M', 8, 9, 27, 30, 33, 'CUSTOM', 'Zonenweitsprung', 15),
       ('W', 6, 7, 18, 21, 24, 'CUSTOM', 'Zonenweitsprung', 15),
       ('W', 8, 9, 24, 27, 30, 'CUSTOM', 'Zonenweitsprung', 15),
       ('M', 10, 11, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 10-11 moeglich', 15),
       ('M', 12, 13, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 12-13 moeglich', 15),
       ('M', 14, 15, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 14-15 moeglich', 15),
       ('M', 16, 17, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 16-17 moeglich', 15),


       ('W', 10, 11, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 10-11 moeglich', 15),
       ('W', 12, 13, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 12-13 moeglich', 15),
       ('W', 14, 15, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 14-15 moeglich', 15),
       ('W', 16, 17, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 16-17 moeglich', 15),

       ('M', 6, 7, 15, 18, 24, 'CUSTOM', 'Drehwurf', 16), -- Drehwurf
       ('M', 8, 9, 21, 27, 33, 'CUSTOM', 'Drehwurf', 16),
       ('M', 10, 11, 33, 39, 45, 'CUSTOM', 'Drehwurf', 16),
       ('W', 6, 7, 12, 15, 21, 'CUSTOM', 'Drehwurf', 16),
       ('W', 8, 9, 18, 21, 27, 'CUSTOM', 'Drehwurf', 16),
       ('W', 10, 11, 27, 30, 36, 'CUSTOM', 'Drehwurf', 16),

       ('M', 12, 13, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 12-13 moeglich', 16),
       ('M', 14, 15, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 14-15 moeglich', 16),
       ('M', 16, 17, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 16-17 moeglich', 16),
       ('W', 12, 13, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 12-13 moeglich', 16),
       ('W', 14, 15, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 14-15 moeglich', 16),
       ('W', 16, 17, -1, -1, -1, 'CUSTOM', 'Nicht fuer das Alter 16-17 moeglich', 16),

       ('M', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 17), -- Schleuderball
       ('M', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 17),
       ('M', 10, 11, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 10-11 moeglich', 17),
       ('W', 6, 7, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 6-7 moeglich', 17),
       ('W', 8, 9, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 8-9 moeglich', 17),
       ('W', 10, 11, -1, -1, -1, 'METERS', 'Nicht fuer das Alter 10-11 moeglich', 17),

       ('M', 12, 13, 1950, 2400, 2750, 'METERS', 'Schleuderball', 17),
       ('M', 14, 15, 2350, 2800, 3200, 'METERS', 'Schleuderball', 17),
       ('M', 16, 17, 2750, 3200, 3650, 'METERS', 'Schleuderball', 17),
       ('W', 12, 13, 1700, 1950, 2200, 'METERS', 'Schleuderball', 17),
       ('W', 14, 15, 1950, 2250, 2550, 'METERS', 'Schleuderball', 17),
       ('W', 16, 17, 2200, 2500, 2800, 'METERS', 'Schleuderball', 17),

       ('M', 6, 7, 10, 15, 25, 'CUSTOM', 'Grundsprung vorwaerts mit oder ohne Zwischensprung ODER Galoppsprung', 18), -- Seilspringen
       ('M', 8, 9, 10, 15, 25, 'CUSTOM', 'Grundsprung vorwaerts mit oder ohne Zwischensprung ODER Galoppsprung', 18),
       ('W', 6, 7, 10, 15, 25, 'CUSTOM', 'Grundsprung vorwaerts mit oder ohne Zwischensprung ODER Galoppsprung', 18),
       ('W', 8, 9, 10, 15, 25, 'CUSTOM', 'Grundsprung vorwaerts mit oder ohne Zwischensprung ODER Galoppsprung', 18),

       ('M', 10, 11, 20, 30, 40, 'CUSTOM', 'Grundsprung vorwaerts ohne Zwischensprung', 18),
       ('W', 10, 11, 20, 30, 40, 'CUSTOM', 'Grundsprung vorwaerts ohne Zwischensprung', 18),
       ('M', 12, 13, 10, 20, 30, 'CUSTOM', 'Grundsprung rueckwerts ohne Zwischensprung', 18),
       ('W', 12, 13, 10, 20, 30, 'CUSTOM', 'Grundsprung rueckwerts ohne Zwischensprung', 18),

       ('M', 14, 15, 10, 15, 20, 'CUSTOM', 'Kreuzdurchschlag ohne Zwischensprung', 18),
       ('M', 16, 17, 10, 15, 20, 'CUSTOM', 'Kreuzdurchschlag ohne Zwischensprung', 18),
       ('W', 14, 15, 10, 15, 20, 'CUSTOM', 'Kreuzdurchschlag ohne Zwischensprung', 18),
       ('W', 16, 17, 10, 15, 20, 'CUSTOM', 'Kreuzdurchschlag ohne Zwischensprung', 18),

       ('M', 6, 7, 1, 2, 3, 'POINTS', 'Schwebebalken', 19), -- Geräteturnen Koordination --
       ('W', 6, 7, 1, 2, 3, 'POINTS', 'Schwebebalken', 19),

       ('M', 8, 9, 1, 2, 3, 'POINTS', 'Reck', 19),
       ('W', 8, 9, 1, 2, 3, 'POINTS', 'Reck', 19),

       ('M', 10, 11, 1, 2, 3, 'POINTS', 'Ringe', 19),
       ('W', 10, 11, 1, 2, 3, 'POINTS', 'Ringe', 19),

       ('M', 12, 13, 1, 2, 3, 'POINTS', 'Boden', 19),
       ('M', 14, 15, 1, 2, 3, 'POINTS', 'Boden', 19),
       ('M', 16, 17, 1, 2, 3, 'POINTS', 'Boden', 19),
       ('W', 12, 13, 1, 2, 3, 'POINTS', 'Boden', 19),
       ('W', 14, 15, 1, 2, 3, 'POINTS', 'Boden', 19),
       ('W', 16, 17, 1, 2, 3, 'POINTS', 'Boden', 19);