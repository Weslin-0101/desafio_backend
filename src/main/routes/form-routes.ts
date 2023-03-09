import { Router } from "express";
import { adaptRoute } from "../adapters/express-route.adapter";
import { makeAddFormController } from "../factories/controllers/add-form/add-form-controller-factory";

export default (router: Router): void => {
  router.post("/form", adaptRoute(makeAddFormController()));
};
