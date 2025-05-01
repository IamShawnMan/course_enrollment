export const config = {
  api: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DB_URL,
  },
  secret: process.env.JWT_SECRET,
};
