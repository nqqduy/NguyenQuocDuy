import { DataSource } from "typeorm";

import { env } from "./env";
import { ResourceEntity } from "src/modules/resources/domain/entities/resource-entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  synchronize: false,
  migrations: ["dist/migrations/*.js"],
  entities: [ResourceEntity],
});
