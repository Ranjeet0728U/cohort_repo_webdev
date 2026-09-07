CREATE TABLE smart_watch_sales (
    sale_id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(100),
    city VARCHAR(50),
    units_sold INT,
    price_per_unit DECIMAL(10, 2),
    sale_date DATE
);

-- Inserting Indian Context Data
INSERT INTO smart_watch_sales (brand, model, city, units_sold, price_per_unit, sale_date) VALUES
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Delhi', 15, 1500.00, '2023-10-02'),
('Noise', 'ColorFit', 'Bangalore', 20, 2000.00, '2023-10-01'),
('Noise', 'ColorFit', 'Mumbai', 5, 2000.00, '2023-10-03'),
('Apple', 'Watch Series 9', 'Mumbai', 2, 45000.00, '2023-10-01'),
('Apple', 'Watch Series 9', 'Bangalore', 8, 45000.00, '2023-10-02'),
('Samsung', 'Galaxy Watch', 'Delhi', 3, 25000.00, '2023-10-01'),
('Boat', 'Xtend', 'Pune', 25, 1200.00, '2023-10-04'),
('Noise', 'Pro 4', 'Delhi', 12, 2500.00, '2023-10-05');


--1. Basic Aggregation 

SELECT COUNT(*) AS total FROM smart_watch_sales;


SELECT SUM(units_sold * price_per_unit) 
AS total_sum 
FROM smart_watch_sales;


SELECT AVG(units_sold * price_per_unit)
AS average
FROM smart_watch_sales;

SELECT MIN(units_sold) AS unit_sold
FROM smart_watch_sales;

SELECT MAX(units_sold) AS unit_sold
FROM smart_watch_sales;

SELECT brand, SUM(units_sold)
AS total_unit_sold 
FROM smart_watch_sales
GROUP BY brand
ORDER BY total_unit_sold DESC;

SELECT city, brand, SUM(units_sold)
AS total_unit_sold 
FROM smart_watch_sales
GROUP BY city, brand
ORDER BY city ASC, total_unit_sold DESC;

SELECT city, brand, SUM(units_sold)
AS total_unit_sold 
FROM smart_watch_sales
WHERE city = 'Mumbai'AND brand = 'Boat'
GROUP BY city, brand
ORDER BY city ASC, total_unit_sold DESC;



/*
he HAVING clause is used to filter the results of a GROUP BY query based on aggregate functions.

Unlike the WHERE clause, which filters individual rows before grouping, the HAVING clause filters groups after the aggregation has been performed.
*/


SELECT city, brand, SUM(units_sold)
AS total_unit_sold
FROM smart_watch_sales
WHERE brand = 'Noise'
GROUP BY  brand, city
HAVING SUM(units_sold) < 20;