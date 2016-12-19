CREATE TABLE "Users"(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  password VARCHAR(255)
);
