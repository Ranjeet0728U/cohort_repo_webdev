CREATE TABLE canteen_menu(
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(50),
    category VARCHAR(50),
    price INTEGER,
    is_availabel BOOLEAN DEFAULT TRUE
);

INSERT INTO canteen_menu (item_name, category, price)
VALUES
('Kachori', 'Snacks', 20),
('Aloo Tikki', 'Snacks', 30),
('Veg Sandwich', 'Fast Food', 50),
('Veg Burger', 'Fast Food', 70),
('Paneer Roll', 'Fast Food', 80),
('Masala Dosa', 'South Indian', 60),
('Idli Sambar', 'South Indian', 40),
('Chole Bhature', 'North Indian', 80),
('Rajma Rice', 'Main Course', 70),
('Veg Biryani', 'Main Course', 90),
('Fried Rice', 'Chinese', 80),
('Hakka Noodles', 'Chinese', 75),
('Manchurian', 'Chinese', 85),
('Tea', 'Beverage', 15),
('Coffee', 'Beverage', 25),
('Cold Coffee', 'Beverage', 50),
('Lemon Soda', 'Beverage', 35),
('Gulab Jamun', 'Dessert', 30),
('Ice Cream', 'Dessert', 40);

-- updation
UPDATE canteen_menu
SET price = price + 10
WHERE item_name = 'Manchurian';

--deletion

DELETE FROM canteen_menu
WHERE item_name = 'Tea';



SELECT * FROM canteen_menu
