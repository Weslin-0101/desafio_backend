import { AddForm } from "@/domain/usecases/add-form";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpes";
import { EmailInUseError } from "@/presentation/errors";

export class FormController implements Controller {
  constructor(
    private readonly _addForm: AddForm,
    private readonly _validation: Validation
  ) {}

  async handle(request: FormController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request);
      if (error) {
        return badRequest(error);
      }

      const { name, email, cpf, phone } = request;
      const form = await this._addForm.add({
        name,
        email,
        cpf,
        phone,
      });

      if (!form) return forbidden(new EmailInUseError());

      return ok(form);
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
