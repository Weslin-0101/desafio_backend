import { AddFormRepository } from "@/data/db/add-form-repository";
import { AddForm } from "@/data/usecases/db-add-form.protocols";
import { CheckFormEmailRepository } from "@/data/db/check-form-email-respository";

export class AddFormRepositorySpy implements AddFormRepository {
  addFormParams: AddFormRepository.Params;
  result = true;

  async add(form: AddForm.Params): Promise<boolean> {
    this.addFormParams = form;
    return Promise.resolve(this.result);
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
