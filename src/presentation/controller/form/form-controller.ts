import { AddForm } from "@/domain/usecases/add-form";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError } from "@/presentation/helpes";

export class FormController implements Controller {
  constructor(private readonly _addForm: AddForm) {}

  async handle(request: FormController.Request): Promise<HttpResponse> {
    try {
      await this._addForm.add(request);
      return {
        statusCode: 200,
      };
    } catch (error) {
      return serverError(error);
    }
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
