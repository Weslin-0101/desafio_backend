import { AddForm } from "@/domain/usecases/add-form";
import { AddFormRepository } from "@/data/db/add-form-repository";
import { CheckFormEmailRepository } from "@/data/db/check-form-email-respository";

export class DbAddForm implements AddForm {
  constructor(
    private readonly _addFormRepository: AddFormRepository,
    private readonly _checkFormByEmailRepository: CheckFormEmailRepository
  ) {}

  async add(form: AddForm.Params): Promise<AddForm.Result> {
    const addForm = await this._addFormRepository.add(form);
    if (!addForm) {
      return Promise.reject(new Error());
    }
    return null;
  }
}
