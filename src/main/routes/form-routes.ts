import { Router } from "express";
import { adaptRoute } from "../adapters/express-route.adapter";
import { makeAddFormController } from "../factories/controllers/add-form/add-form-controller-factory";

const router = Router();

router.post("/forms", adaptRoute(makeAddFormController()));

export default router;
