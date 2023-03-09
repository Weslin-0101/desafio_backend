import { AddForm } from "@/domain/usecases/add-form";
import { AddFormRepository } from "@/data/db/add-form-repository";

export class DbAddForm implements AddForm {
  constructor(private readonly _addFormRepository: AddFormRepository) {}

  async add(form: AddForm.Params): Promise<AddForm.Result> {
    return this._addFormRepository.add(form);
  }
}
