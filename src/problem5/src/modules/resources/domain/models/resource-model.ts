import { BaseModel } from "src/common/models/base-model";
import { ResourceEntity } from "../entities/resource-entity";

export class ResourceModel extends BaseModel<ResourceEntity> {
  private id!: number;
  private name!: string;
  private description?: string;
  private createdAt!: Date;
  private updatedAt!: Date;

  constructor(resourceEntity?: ResourceEntity) {
    super();

    if (!resourceEntity) {
      return;
    }

    this.id = resourceEntity.id;
    this.name = resourceEntity.name;
    this.description = resourceEntity.description;
    this.createdAt = resourceEntity.createdAt;
    this.updatedAt = resourceEntity.updatedAt;
  }

  public toEntity(): ResourceEntity {
    const entity: ResourceEntity = new ResourceEntity();

    entity.id = this.id;
    entity.name = this.name;
    entity.description = this.description;
    entity.createdAt = this.createdAt;
    entity.updatedAt = this.updatedAt;

    return entity;
  }

  public toJSON(): Record<string, any> {
    const result = {
      id: this.id,
      name: this.name,
      description: this.description,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
    return result;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string | undefined): void {
    this.description = description;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
