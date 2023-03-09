import { AddForm } from "@/domain/usecases/add-form";
import { mockAddFormModel } from "@/tests/domain/mocks";

export class AddFormSpy implements AddForm {
  form = mockAddFormModel();
  addFormParams: AddForm.Params;

  async add(form: AddForm.Params): Promise<AddForm.Result> {
    this.addFormParams = form;
    return Promise.resolve(this.form);
  }
}
