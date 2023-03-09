import { AddForm } from "@/domain/usecases/add-form";
import { throws } from "assert";
import { AddFormRepository } from "../db/add-form-repository";
import { CheckFormEmailRepository } from "../db/check-form-email-respository";

export class DbAddForm implements AddForm {
  constructor(
    private readonly _addFormRepository: AddFormRepository,
    private readonly _checkFormByEmailRepository: CheckFormEmailRepository
  ) {}

  async add(form: AddForm.Params): Promise<boolean> {
    const exists = await this._checkFormByEmailRepository.checkByEmail(
      form.email
    );

    let result = false;

    if (!exists) {
      result = await this._addFormRepository.add({
        ...form,
      });
    }

    return result;
  }
}
