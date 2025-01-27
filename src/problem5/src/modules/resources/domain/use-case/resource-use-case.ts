import { AppError } from "src/utils/error";
import { CreateResourceDTO } from "../../infras/api/dtos/create-resource.dto";
import { ResourceRepository } from "../abstract-repository/resource-abstract-repository";
import { ResourceModel } from "../models/resource-model";
import { ListResourceDTO } from "../../infras/api/dtos/list-resource.dto";
import { ResourceEntity } from "../entities/resource-entity";
import { FindManyOptions } from "typeorm";
import { UpdateResourceDTO } from "../../infras/api/dtos/update-resource.dto";

export class ResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async createResource(data: CreateResourceDTO) {
    const resourceModel = new ResourceModel();
    resourceModel.setName(data.name);
    resourceModel.setDescription(data.description);
    resourceModel.setCreatedAt(new Date());
    resourceModel.setUpdatedAt(new Date());

    return await this.resourceRepository.create(resourceModel);
  }

  async getResource(id: number) {
    const resourceModel = await this.resourceRepository.findOne({ where: { id } });

    if (!resourceModel) {
      throw AppError.from("Resource not found", 404);
    }

    return resourceModel;
  }

  async listResource(query: ListResourceDTO) {
    const conditions: FindManyOptions<ResourceEntity> = {};
    conditions.take = query.pageSize;
    conditions.skip = (query.pageIndex - 1) * query.pageSize;

    if (query.name) {
      conditions.where = { name: query.name };
    }
    if (query.description) {
      conditions.where = { description: query.description };
    }

    return await this.resourceRepository.findMany(conditions);
  }

  async updateResource(id: number, data: UpdateResourceDTO) {
    const resourceModel = await this.resourceRepository.findOne({ where: { id } });

    if (!resourceModel) {
      throw AppError.from("Resource not found", 404);
    }

    if (data.name) resourceModel.setName(data.name);
    if (data.description) resourceModel.setDescription(data.description);
    resourceModel.setUpdatedAt(new Date());

    return await this.resourceRepository.update(id, resourceModel);
  }

  async deleteResource(id: number) {
    const resourceModel = await this.resourceRepository.findOne({ where: { id } });

    if (!resourceModel) {
      throw AppError.from("Resource not found", 404);
    }

    return await this.resourceRepository.delete(id);
  }
}
