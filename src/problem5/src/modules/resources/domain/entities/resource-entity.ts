// import { DATABASE_NAME } from "src/constants";
import { DATABASE_NAME } from "src/constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ResourceModel } from "../models/resource-model";

@Entity(DATABASE_NAME.RESOURCE)
export class ResourceEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "description", nullable: true })
  description?: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  toModel(): ResourceModel {
    const model = new ResourceModel();
    model.setId(this.id);
    model.setName(this.name);
    model.setDescription(this.description);
    model.setCreatedAt(this.createdAt);
    model.setUpdatedAt(this.updatedAt);

    return model;
  }
}
