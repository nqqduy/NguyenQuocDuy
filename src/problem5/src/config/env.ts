import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

export const env = {
  envName: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  database: {
    name: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT)!,
  },
};
