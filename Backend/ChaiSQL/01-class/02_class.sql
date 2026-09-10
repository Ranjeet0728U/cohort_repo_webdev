CREATE TABLE ipl_players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    team VARCHAR(50),
    role VARCHAR(50), -- Batsman, Bowler, All-Rounder
    runs_scored INT,
    wickets_taken INT,
    auction_price_crores DECIMAL(5, 2)
);

ALTER TABLE ipl_players
ADD COLUMN nickname varchar(50);

INSERT INTO ipl_players(name, team, role, runs_scored, wicketS_taken, auction_price_crores, nickname) VALUES
('Virat Kohli', 'RCB', 'Batsman', 973, 0, 15.00, 'King Kohli'),
('MS Dhoni', 'CSK', 'Wicketkeeper', 450, 0, 12.00, 'Thala'),
('Jasprit Bumrah', 'Mumbai Indians', 'Bowler', 15, 27, 12.00, 'Jassi'),
('Hardik Pandya', 'Mumbai Indians', 'All-Rounder', 400, 15, 15.00, 'Kung Fu Pandya'),
('Sunil Narine', 'KKR', 'All-Rounder', 350, 20, 8.50, 'Carrom King'),
('Rohit Sharma', 'Mumbai Indians', 'Batsman', 550, 0, 16.00, 'Hitman'),
('Rashid Khan', 'Gujarat Titans', 'Bowler', 50, 19, 15.00, 'The Magician'),
('Rinku Singh', 'KKR', 'Batsman', 475, 0, 0.55, 'The Spirit'),
('Arjun Tendulkar', 'Mumbai Indians', 'Bowler', 10, 3, 0.30, 'Arjun'),
('Kane Williamson', 'LSG', 'Batsman', 600, 0, 11.00, 'Kane Mama'),
('Mystery Player', NULL, 'Batsman', 0, 0, 1.00, 'Mystery Man'); 


SELECT * FROM ipl_players;

SELECT name, team, nickname FROM ipl_players;

SELECT name, role, auction_price_crores FROM ipl_players 
WHERE team = 'Mumbai Indians';

SELECT name, team, role FROM ipl_players
where auction_price_crores >= 10;

SELECT * FROM ipl_players
WHERE role = 'All-Rounder';

SELECT * FROM ipl_players
WHERE team = 'Mumbai Indians' OR team = 'CSK';


SELECT * FROM ipl_players
WHERE role = 'All-Rounder' AND wickets_taken > 10;


--! Pattern Matching

SELECT * FROM ipl_players
WHERE name LIKE '__r%';

SELECT * FROM ipl_players
WHERE name LIKE '%r%'; --! case sensitive here r != R

SELECT * FROM ipl_players
WHERE name ILIKE '%R%'; --! not case sensitive here R == r

SELECT * FROM ipl_players
WHERE auction_price_crores BETWEEN 10 AND 15;


SELECT name, nickname FROM ipl_players
WHERE team != 'CSK';

--! Sorting

SELECT name, nickname from ipl_players
ORDER BY auction_price_crores DESC; --! DESCING BY AUCTION PRICE


SELECT name, nickname, auction_price_crores from ipl_players
ORDER BY name ASC; --! ASCENDING BY NAME

SELECT name, nickname,team, auction_price_crores
FROM ipl_players
ORDER BY team ASC,
auction_price_crores DESC;



--! Pagination


SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores ASC
LIMIT 3 OFFSET 5;


--! MODIFY DATA AT RUN TIME

SELECT name, nickname, auction_price_crores, (auction_price_crores + 2) AS new_Price
FROM ipl_players;

SELECT name, nickname, auction_price_crores, (auction_price_crores * 100) AS price_in_lakh
FROM ipl_players;


--! HOW TO GET DISTINCT VALUE

SELECT distinct role FROM ipl_players; --Bowler, Batsman, All-rounder, WicketKeeper



