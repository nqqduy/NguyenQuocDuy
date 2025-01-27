import Logger from "../utils/logger";
import { dataSource } from "./ormconfig";

export async function connectDataBase() {
  try {
    await dataSource.initialize();
    Logger.success("TypeORM connected to database");
  } catch (error: any) {
    Logger.error("TypeORM connection failed: " + error.message);
  }
}
