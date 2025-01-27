import { ResourceRepository } from "src/modules/resources/domain/abstract-repository/resource-abstract-repository";
import { ResourceEntity } from "src/modules/resources/domain/entities/resource-entity";
import { ResourceModel } from "src/modules/resources/domain/models/resource-model";
import { dataSource } from "src/config/ormconfig";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";

export class ResourceRepositoryPostgresqlImpl extends ResourceRepository {
  private resourceRepository: Repository<ResourceEntity>;

  constructor() {
    super();
    this.resourceRepository = dataSource.getRepository(ResourceEntity);
  }

  async create(data: ResourceModel): Promise<void> {
    await this.resourceRepository.save(data.toEntity());
  }

  async delete(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }

  async findMany(filter: FindManyOptions<ResourceEntity>): Promise<{ items: ResourceModel[]; total: number }> {
    const [data, total] = await this.resourceRepository.findAndCount(filter);
    const resourceModels = data.map((item) => item.toModel());
    return { items: resourceModels, total };
  }

  async findOne(filter: FindOneOptions<ResourceEntity>): Promise<ResourceModel | null> {
    const resourceEntity = await this.resourceRepository.findOne(filter);
    return resourceEntity ? resourceEntity.toModel() : null;
  }

  async update(id: number, data: ResourceModel): Promise<void> {
    await this.resourceRepository.update(id, data.toEntity());
  }
}
