import { IsOptional, IsString, MaxLength, Min } from "class-validator";
import { ResourceDTO } from "./resource.dto";
import { Transform } from "class-transformer";

export class UpdateResourceDTO extends ResourceDTO {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name!: string;

  @MaxLength(1000)
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  description?: string;
}
