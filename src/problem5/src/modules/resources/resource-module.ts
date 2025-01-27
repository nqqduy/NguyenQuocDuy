import { Router } from "express";
import { ResourceController } from "./infras/api/resource-controller";
import { ResourceUseCase } from "./domain/use-case/resource-use-case";
import { ResourceRepositoryPostgresqlImpl } from "./infras/repository/postgresql/resource-repository-postgresql-impl";

export function setUpResourceModule(): Router {
  // Can use IOC library to manage instance (dependency injection)
  const resourceRepositoryPostgresqlImpl = new ResourceRepositoryPostgresqlImpl();
  const resourceUseCase = new ResourceUseCase(resourceRepositoryPostgresqlImpl);
  const resourceController = new ResourceController(resourceUseCase);

  return resourceController.getRoutes();
}
