CREATE TABLE users (
    email varchar(50) primary key,
    password varchar(20),
    coins int,
    created_at int,
    updated_at int
);

CREATE TABLE items(
	i_id int primary key,
	i_name varchar(50),
	rare smallint
);

CREATE TABLE user_item(
	email varchar(50),
	i_id int,
	quantity int
);

CREATE TABLE gacha_probability (
	g_id int,
	rare smallint primary key(g_id, rare),
	probability int
);

INSERT INTO users VALUES("admin@ad.min","admin");
INSERT INTO gacha_probability VALUES (0,0,70);
INSERT INTO gacha_probability VALUES (0,1,25);
INSERT INTO gacha_probability VALUES (0,2,4);
INSERT INTO gacha_probability VALUES (0,3,1);
INSERT INTO gacha_probability VALUES (1,0,10);
INSERT INTO gacha_probability VALUES (1,1,50);
INSERT INTO gacha_probability VALUES (1,2,30);
INSERT INTO gacha_probability VALUES (1,3,10);
INSERT INTO gacha_probability VALUES (2,0,55);
INSERT INTO gacha_probability VALUES (2,1,25);
INSERT INTO gacha_probability VALUES (2,2,15);
INSERT INTO gacha_probability VALUES (2,3,5);
INSERT INTO items (i_id, i_name, rare) VALUES (0, "Mandrake", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (1, "Elixir", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (2, "Panacea", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (3, "Dried Sage", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (4, "Heartsblood", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (5, "Blood Meal", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (6, "Copper Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (7, "Silver Coin", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (8, "Scarlet Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (9, "Bugle", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (10, "Gjallarhorn", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (11, "Event Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (12, "HP Crystal", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (13, "Attack Crystal", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (14, "Defense Crystal", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (15, "Wisdom Crystal", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (16, "Agility Crystal", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (17, "Magic Shard", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (18, "Keystone Shard", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (19, "Tower Coins", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (20, "Jubilee Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (21, "Event Coin (Labyrinth)", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (22, "Copper-Sun Coin", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (23, "Silver-Kindred Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (24, "Gold-Kindred Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (25, "Blood Seal", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (26, "Deyos Coin", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (27, "Mandrake (Bloodbound)", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (28, "Heartsblood (Bloodbound)", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (29, "Gjallarhorn (Bloodbound)", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (30, "Mandrake Leaf", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (31, "Event Gold", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (32, "Event Silver", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (33, "Dark Ice", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (34, "Heroes' Writ", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (35, "Shadow Shards", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (36, "Ruby Ore", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (37, "Sapphire Ore", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (38, "Emerald Ore", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (39, "Warrior's Seal 1", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (40, "Warrior's Seal 2", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (41, "Warrior's Seal 3", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (42, "Hero's Seal 1", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (43, "Hero's Seal 2", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (44, "Hero's Seal 3", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (45, "Premium-Sun Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (46, "Rose Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (47, "Legends Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (48, "Copper Floret Slip", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (49, "Silver Floret Slip", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (50, "Gold Floret Slip", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (51, "Valor Gem", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (52, "Fragment of Glory", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (53, "Fragment of Cheer", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (54, "Victory Coin", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (55, "Treasure Ticket", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (56, "Truesight Amulet", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (57, "Wereheart Shard", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (58, "Beastheart Shard", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (59, "Werebeast Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (60, "Pumpkin Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (61, "Snow Gem", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (62, "Ornament of Ribbons", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (63, "Ornament of Brilliance", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (64, "Ornament of Ripples", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (65, "Sanctum Key", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (66, "Snowflake Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (67, "Eden Rose", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (68, "Blood Rose", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (69, "Blood Relic", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (70, "Soul Fragment of Valafar", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (71, "Celebration Fireworks", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (72, "Crystallized Time", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (73, "Christmas Treat", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (74, "Loyalty Coin", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (75, "Soulstone of Peony", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (76, "Soulstone of Cocytus", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (77, "Soulstone of Aipaloovik", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (78, "Soulstone of Botis", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (79, "Mandrake", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (80, "Elixir", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (81, "Panacea", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (82, "Dried Sage", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (83, "Heartsblood", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (84, "Blood Meal", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (85, "Copper Coin", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (86, "Silver Coin", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (87, "Scarlet Coin", 2);
INSERT INTO items (i_id, i_name, rare) VALUES (88, "Bugle", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (89, "Gjallarhorn", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (90, "Event Coin", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (91, "HP Crystal", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (92, "Attack Crystal", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (93, "Defense Crystal", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (94, "Wisdom Crystal", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (95, "Agility Crystal", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (96, "Magic Shard", 3);
INSERT INTO items (i_id, i_name, rare) VALUES (97, "Keystone Shard", 1);
INSERT INTO items (i_id, i_name, rare) VALUES (98, "Tower Coins", 0);
INSERT INTO items (i_id, i_name, rare) VALUES (99, "Jubilee Coin", 2);