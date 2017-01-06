CREATE TABLE "Users"(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  username VARCHAR(255),
  email VARCHAR(255),
  salt VARCHAR(255),
  password VARCHAR(255)
);
