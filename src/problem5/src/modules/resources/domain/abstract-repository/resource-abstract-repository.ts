import { FindManyOptions, FindOneOptions } from "typeorm";
import { ResourceModel } from "../models/resource-model";
import { ResourceEntity } from "../entities/resource-entity";

export abstract class ResourceRepository {
  abstract create(data: ResourceModel): Promise<void>;
  abstract findOne(filter: FindOneOptions<ResourceEntity>): Promise<ResourceModel | null>;
  abstract findMany(filter: FindManyOptions<ResourceEntity>): Promise<{ items: ResourceModel[]; total: number }>;
  abstract update(id: number, data: ResourceModel): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
