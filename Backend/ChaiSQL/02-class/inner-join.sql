DROP TABLE IF EXISTS internships;
DROP TABLE IF EXISTS students;


CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    branch VARCHAR(50)
);

CREATE TABLE internships (
    internship_id SERIAL PRIMARY KEY,
    
    student_id INT REFERENCES students(student_id) ON DELETE SET NULL,
    
    company_name VARCHAR(100),
    role VARCHAR(50),
    stipend INT,
    status VARCHAR(20)
);

INSERT INTO students (name, email, branch) VALUES 
('Rahul', 'rahul@gmail.com', 'Computer Science'),
('Sneha', 'sneha@yahoo.com', 'Information Tech'),
('Amit', 'amit@hotmail.com', 'Electronics'),
('Priya', 'priya@gmail.com', 'Mechanical'),
('Rohan', 'rohan@outlook.com', 'Civil'); 



INSERT INTO internships (student_id, company_name, role, stipend, status) VALUES 
(1, 'Google', 'Software Engineering Intern', 100000, 'Selected'), 
(1, 'Microsoft', 'SDE Intern', 85000, 'Selected'), 
(2, 'Amazon', 'Data Analyst Intern', 60000, 'Pending'),
(3, 'TCS', 'System Engineer Intern', 20000, 'Selected'), 
(5, 'OpenAI', 'AI Researcher', 150000, 'Selected'); 



SELECT 
    s.name,
    s.student_id,
    i.company_name,
    i.role,
    i.stipend
FROM students AS s
INNER JOIN internships AS i 
ON s.student_id = i.student_id;