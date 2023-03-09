import { DbAddForm } from "@/data/usecases/db-add-form";
import { AddFormRepository } from "../db/add-form-repository";
import { AddForm } from "./db-add-form.protocols";

const mockAddFormParams = (): AddForm.Params => ({
  name: "any_name",
  email: "any_email@email.com",
  cpf: "any_cpf",
  phone: "any_phone",
});

class AddFormRepositorySpy implements AddFormRepository {
  addFormParams: AddFormRepository.Params;

  async add(form: AddForm.Params): Promise<boolean> {
    this.addFormParams = form;
    return true;
  }
}

describe("AddForm Usecase", () => {
  test("Should call AddFormRepository with correct values", async () => {
    const addFormRepositorySpy = new AddFormRepositorySpy();
    const sut = new DbAddForm(addFormRepositorySpy);
    const addFormParams = mockAddFormParams();
    await sut.add(addFormParams);
    expect(addFormRepositorySpy.addFormParams).toEqual({
      name: addFormParams.name,
      email: addFormParams.email,
      cpf: addFormParams.cpf,
      phone: addFormParams.phone,
    });
  });
});
