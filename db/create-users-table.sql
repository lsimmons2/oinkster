CREATE TABLE "Users"(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  username VARCHAR(255),
  email VARCHAR(255),
  salt VARCHAR(255),
  password VARCHAR(255),
  bio VARCHAR(255),
  picture VARCHAR(255)
);
