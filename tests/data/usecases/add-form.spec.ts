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
    expect(addFormRepositorySpy.addFormParams).toEqual({
      name: addFormParams.name,
      email: addFormParams.email,
      cpf: addFormParams.cpf,
      phone: addFormParams.phone,
    });
  });

  test("Should throw if AddFormRepository throws", async () => {
    const { sut, addFormRepositorySpy } = makeSut();
    jest
      .spyOn(addFormRepositorySpy, "add")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.add(mockAddFormParams());
    expect(promise).rejects.toThrow();
  });

  test("Should return true on success", async () => {
    const { sut } = makeSut();
    const isValid = await sut.add(mockAddFormParams());
    expect(isValid).toBe(true);
  });
});
