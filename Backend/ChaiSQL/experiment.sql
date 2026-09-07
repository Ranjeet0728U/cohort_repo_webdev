DROP TABLE IF EXISTS Student;

CREATE TABLE Student(
    id INTEGER PRIMARY KEY,
    name VARCHAR(50),
    GPA DECIMAL(3,2),
    sizeHS INTEGER,
    DoB DATE
);

INSERT INTO Student(id, name, GPA, sizeHS, DoB) VALUES
(123, 'Amy',    3.9, 1000, '1996-06-26'),
(234, 'Bob',    3.6, 1500, '1995-04-07'),
(345, 'Craig',  3.5,  500, '1995-02-04'),
(456, 'Drois',  3.9, 1000, '1997-07-24'),
(567, 'Edward', 3.8, 2000, '1996-06-26'),
(678, 'Fay',    3.9,  200, '1996-08-27'),
(789, 'Gary',   3.4,  800, '1996-10-08'),
(987, 'Hein',   3.7,  800, '1997-03-27'),
(876, 'Irene',  3.9,  400, '1996-03-07'),
(765, 'Jay',    2.9, 1500, '1998-08-08'),
(654, 'Amy',    3.9, 1000, '1998-08-27'),
(543, 'Craig',  3.4, 2000, '1998-08-27');

DROP TABLE IF EXISTS apply;

CREATE TABLE Apply(
    id INTEGER,
    name VARCHAR(20),
    major VARCHAR(50),
    decision BOOLEAN 
);

INSERT INTO apply(id, name, major, decision) VALUES
(123, 'STANDFORD', 'CS', TRUE),
(123, 'STANFORD', 'EE', FALSE),
(123, 'Berkeley', 'CS', TRUE),
(123, 'Cornell', 'EE', TRUE),
(234, 'Berkeley', 'Biology', FALSE),
(345, 'MIT', 'Bioengineering', TRUE),
(345, 'Cornell', 'Bioengineering', FALSE),
(345, 'Cornell', 'CS', TRUE),
(345, 'Cornell', 'EE', FALSE),
(678, 'STANFORD', 'HISTORY', TRUE),
(987, 'STANFORD', 'CS', TRUE),
(987, 'Berkeley', 'CS', TRUE),
(876, 'STANFORD', 'CS', TRUE);


CREATE TABLE college(
    name VARCHAR(50),
    state VARCHAR(10),
    enrollment INTEGER
);

INSERT INTO college(name, state, enrollment)VALUES
('STANFORD', 'CA',  15000),
('Berkeley')