import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ResourceDTO {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name!: string;

  @MaxLength(1000)
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  description?: string;
}
