import { AddForm } from "@/domain/usecases/add-form";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { forbidden, serverError } from "@/presentation/helpes";
import { EmailInUseError } from "@/presentation/errors";

export class FormController implements Controller {
  constructor(private readonly _addForm: AddForm) {}

  async handle(request: FormController.Request): Promise<HttpResponse> {
    try {
      const { name, email, cpf, phone } = request;
      const form = await this._addForm.add({
        name,
        email,
        cpf,
        phone,
      });

      if (!form) return forbidden(new EmailInUseError());

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
