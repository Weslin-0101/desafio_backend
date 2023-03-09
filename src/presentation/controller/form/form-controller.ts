import { AddForm } from "@/domain/usecases/add-form";

export class FormController {
  constructor(private readonly _addForm: AddForm) {}

  async handle(request: FormController.Request): Promise<void> {
    await this._addForm.add(request);
  }
}

export namespace FormController {
  export type Request = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
}
