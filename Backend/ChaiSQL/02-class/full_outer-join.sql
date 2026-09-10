SELECT 
    s.student_id,
    s.name,
    i.company_name,
    i.role
FROM students AS s
FULL OUTER JOIN internships AS i
ON s.student_id = i.student_id;

DELETE FROM students 
WHERE student_id = 5;

