import { DbAddForm } from "@/data/usecases/db-add-form";
import { mockAddFormParams } from "@/tests/domain/mocks";
import {
  AddFormRepositorySpy,
  CheckFormByEmailRepositorySpy,
} from "@/tests/data/mocks";

type SutTypes = {
  sut: DbAddForm;
  addFormRepositorySpy: AddFormRepositorySpy;
  checkFormByEmailRepositorySpy: CheckFormByEmailRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addFormRepositorySpy = new AddFormRepositorySpy();
  const checkFormByEmailRepositorySpy = new CheckFormByEmailRepositorySpy();
  const sut = new DbAddForm(
    addFormRepositorySpy,
    checkFormByEmailRepositorySpy
  );
  return {
    sut,
    addFormRepositorySpy,
    checkFormByEmailRepositorySpy,
  };
};

describe("AddForm Usecase", () => {
  test("Should call AddFormRepository with correct values", async () => {
    const { sut, addFormRepositorySpy } = makeSut();
    const addFormParams = mockAddFormParams();
    await sut.add(addFormParams);
    expect(addFormRepositorySpy.params).toEqual({
      name: addFormParams.name,
      email: addFormParams.email,
      cpf: addFormParams.cpf,
      phone: addFormParams.phone,
    });
  });
});
