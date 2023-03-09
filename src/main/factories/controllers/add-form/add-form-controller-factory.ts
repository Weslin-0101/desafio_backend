import { Controller } from "@/presentation/protocols";
import { FormController } from "@/presentation/controller";
import { makeDbAddForm } from "@/main/factories/usecases/add-form-factory";
import { makeAddFormValidation } from "./add-form-validation-factory";

export const makeAddFormController = (): Controller => {
  const controller = new FormController(
    makeDbAddForm(),
    makeAddFormValidation()
  );
  return controller;
};
