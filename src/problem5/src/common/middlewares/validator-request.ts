import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

type Payload = Array<{
  name: string;
  constraints: Object | null;
  children: Payload | null;
}>;

function validator(_class: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (req.method == "GET") {
      req.query = plainToInstance(_class, req.query);
      data = req.query;
    } else {
      req.body = plainToInstance(_class, req.body);
      data = req.body;
    }

    const errors = await validate(data);

    if (errors.length > 0) {
      let payload: Payload = [];
      let message: string = `VALIDATION ERROR`;

      errors.forEach((error) => {
        if (error.children?.length) {
          payload.push({
            name: error.property,
            children: validateChildren(error.children),
            constraints: null,
          });
        }

        if (error.constraints) {
          payload.push({
            name: error.property,
            constraints: error.constraints,
            children: null,
          });
        }
      });
      res.status(400).send({ data: payload, message });
      return;
    }
    next();
  };
}

// handle validate nested object, if error has children
function validateChildren(errors: ValidationError[]) {
  let payload: Payload = [];

  errors.forEach((error) => {
    if (error.children?.length) {
      return payload.concat(validateChildren(error.children));
    }

    if (error.constraints) {
      payload.push({
        name: error.property,
        constraints: error.constraints,
        children: null,
      });
    }
  });
  return payload;
}

export default validator;
