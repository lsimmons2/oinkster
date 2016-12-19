CREATE TABLE "Oinks"(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text VARCHAR(255),
  asset VARCHAR(255),
  "user" VARCHAR(255)
);
