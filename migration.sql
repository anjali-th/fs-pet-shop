DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    kind TEXT
);

INSERT INTO pets(name, age, kind) VALUES ('Fido', 7 , 'dog');
INSERT INTO pets(name, age, kind) VALUES ('Buttons', 5 , 'snake');