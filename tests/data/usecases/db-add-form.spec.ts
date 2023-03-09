import { DbAddForm } from "@/data/usecases/db-add-form";
import { mockAddFormParams } from "@/tests/domain/mocks";
import { AddFormRepositorySpy } from "@/tests/data/mocks";

type SutTypes = {
  sut: DbAddForm;
  addFormRepositorySpy: AddFormRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addFormRepositorySpy = new AddFormRepositorySpy();
  const sut = new DbAddForm(addFormRepositorySpy);
  return {
    sut,
    addFormRepositorySpy,
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

  test("Should throw if AddFormRepository throws", async () => {
    const { sut, addFormRepositorySpy } = makeSut();
    jest.spyOn(addFormRepositorySpy, "add").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.add(mockAddFormParams());
    expect(promise).rejects.toThrow();
  });

  test("Should return a form on success", async () => {
    const { sut } = makeSut();
    const form = await sut.add(mockAddFormParams());
    expect(form).toEqual({
      id: "any_id",
      name: "any_name",
      email: "any_email@email.com",
      cpf: "any_cpf",
      phone: "any_phone",
    });
  });
});
