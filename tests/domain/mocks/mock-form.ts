import { AddForm } from "@/domain/usecases/add-form";

export const mockAddFormParams = (): AddForm.Params => ({
  name: "any_name",
  email: "any_email@email.com",
  cpf: "any_cpf",
  phone: "any_phone",
});
