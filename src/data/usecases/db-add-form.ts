import { AddForm } from "@/domain/usecases/add-form";
import { AddFormRepository } from "../db/add-form-repository";

export class DbAddForm implements AddForm {
  constructor(private readonly _addFormRepository: AddFormRepository) {}

  async add(form: AddForm.Params): Promise<boolean> {
    await this._addFormRepository.add(form);
    return true;
  }
}
