import { AddForm } from "@/domain/usecases/add-form";
import { AddFormRepository } from "@/data/db/add-form-repository";
import { CheckFormEmailRepository } from "../db/check-form-email-respository";

export class DbAddForm implements AddForm {
  constructor(
    private readonly _addFormRepository: AddFormRepository,
    private readonly _checkFormByEmailRepository: CheckFormEmailRepository
  ) {}

  async add(form: AddForm.Params): Promise<AddForm.Result> {
    const exists = await this._checkFormByEmailRepository.checkByEmail(
      form.email
    );

    if (!exists) {
      return this._addFormRepository.add(form);
    }

    return null;
  }
}
