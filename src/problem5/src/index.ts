import { NextFunction, Request, Response } from "express";
import { createServer } from "http";

import { connectDataBase } from "./config/database";
import { env } from "./config/env";
import Logger from "./utils/logger";
import app from "./app";
import { responseErr } from "./utils/error";
import { setUpResourceModule } from "src/modules/resources/resource-module";

async function bootServer() {
  try {
    Logger.info(`Starting server in ${env.envName} mode`);

    await connectDataBase();

    const resourceModule = setUpResourceModule();

    app.use("/v1/resources", resourceModule);

    // Error handling
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      responseErr(err, res);
      return next();
    });

    const server = createServer(app);
    server.listen(env.port, () => {
      Logger.success(`Server is running on port ${env.port}`);
    });
  } catch (error: any) {
    Logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
}

bootServer();
