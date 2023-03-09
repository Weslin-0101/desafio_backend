import { AddFormRepository } from "@/data/db/add-form-repository";
import { AddForm } from "@/data/usecases/db-add-form.protocols";

export class AddFormRepositorySpy implements AddFormRepository {
  addFormParams: AddFormRepository.Params;
  result = true;

  async add(form: AddForm.Params): Promise<boolean> {
    this.addFormParams = form;
    return Promise.resolve(this.result);
  }
}
