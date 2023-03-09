import { FormModel } from "@/domain/model";

export interface AddForm {
  add(form: AddForm.Params): Promise<AddForm.Result>;
}

export namespace AddForm {
  export type Params = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };

  export type Result = FormModel;
}
