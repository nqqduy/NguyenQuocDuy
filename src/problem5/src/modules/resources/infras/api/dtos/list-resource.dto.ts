import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class ListResourceDTO {
  @IsString({ message: "name must be a string" })
  @IsOptional({ message: "name must not be empty" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name?: string;

  @IsString({ message: "description must be a string" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  description?: string;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageIndex: number = 1;

  @Max(100)
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number = 20;
}
