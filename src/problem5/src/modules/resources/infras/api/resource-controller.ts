import { NextFunction, Request, Response, Router } from "express";
import { ResourceUseCase } from "../../domain/use-case/resource-use-case";
import { successResponse } from "src/utils/response";
import { ListResourceDTO } from "./dtos/list-resource.dto";
import validator from "src/common/middlewares/validator-request";
import { CreateResourceDTO } from "./dtos/create-resource.dto";
import { UpdateResourceDTO } from "./dtos/update-resource.dto";

export class ResourceController {
  constructor(private readonly resourceUseCase: ResourceUseCase) {}

  private async getResourceAPI(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params?.id;
      const resource = await this.resourceUseCase.getResource(Number(id));
      successResponse(resource!.toJSON(), res);
    } catch (error) {
      next(error);
    }
  }

  private async listResourceAPI(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as any as ListResourceDTO;
      const response = await this.resourceUseCase.listResource(query);
      successResponse(response, res);
    } catch (error) {
      next(error);
    }
  }

  private async createResourceAPI(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.resourceUseCase.createResource(data);
      successResponse(null, res);
    } catch (error) {
      next(error);
    }
  }

  private async updateResourceAPI(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const id = req.params.id;
      await this.resourceUseCase.updateResource(+id, data);
      successResponse(null, res);
    } catch (error) {
      next(error);
    }
  }

  private async deleteResourceAPI(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.resourceUseCase.deleteResource(+id);
      successResponse(null, res);
    } catch (error) {
      next(error);
    }
  }

  public getRoutes(): Router {
    const router = Router();

    router.get("/", validator(ListResourceDTO), this.listResourceAPI.bind(this));
    router.post("/", validator(CreateResourceDTO), this.createResourceAPI.bind(this));
    router.patch("/:id(\\d+)", validator(UpdateResourceDTO), this.updateResourceAPI.bind(this));
    router.delete("/:id(\\d+)", this.deleteResourceAPI.bind(this));
    router.get("/:id(\\d+)", this.getResourceAPI.bind(this));

    return router;
  }
}
