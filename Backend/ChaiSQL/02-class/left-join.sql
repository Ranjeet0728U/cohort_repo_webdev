SELECT 
    s.student_id,
    s.name,
    i.company_name,
    i.role
FROM students AS s
LEFT JOIN internships AS i
ON s.student_id = i.student_id;

SELECT 
    s.student_id,
    s.name,
    i.company_name,
    i.role
FROM in AS i
LEFT JOIN students AS s
ON s.student_id = i.student_id;


-- to find data like student who don't have internship 
-- left join + filter on right side table.
SELECT 
    s.student_id,
    s.name,
    i.company_name,
    i.role
FROM students AS s
LEFT JOIN internships AS i
ON s.student_id = i.student_id
WHERE internship_id IS NULL;