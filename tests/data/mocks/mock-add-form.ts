import { AddFormRepository } from "@/data/db/add-form-repository";
import { AddForm } from "@/data/usecases/db-add-form.protocols";
import { CheckFormEmailRepository } from "@/data/db/check-form-email-respository";
import { mockAddFormModel } from "@/tests/domain/mocks";

export class AddFormRepositorySpy implements AddFormRepository {
  addFormParams = mockAddFormModel();
  params: AddForm.Params;

  async add(form: AddForm.Params): Promise<AddForm.Result> {
    this.params = form;
    return Promise.resolve(this.addFormParams);
  }
}

export class CheckFormByEmailRepositorySpy implements CheckFormEmailRepository {
  email: string;
  result = false;

  async checkByEmail(email: string): Promise<boolean> {
    this.email = email;
    return Promise.resolve(this.result);
  }
}
