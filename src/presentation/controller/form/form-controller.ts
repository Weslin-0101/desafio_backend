import { AddForm } from "@/domain/usecases/add-form";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class FormController implements Controller {
  constructor(private readonly _addForm: AddForm) {}

  async handle(request: FormController.Request): Promise<HttpResponse> {
    await this._addForm.add(request);

    return {
      statusCode: 200,
      body: null,
    };
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
