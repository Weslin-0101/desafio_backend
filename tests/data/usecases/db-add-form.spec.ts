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

  test("Should return false if AddFormRepository returns false", async () => {
    const { sut, addFormRepositorySpy } = makeSut();
    addFormRepositorySpy.result = false;
    const isValid = await sut.add(mockAddFormParams());
    expect(isValid).toBe(false);
  });

  test("Should return false if CheckFormByEmailRepository returns true", async () => {
    const { sut, checkFormByEmailRepositorySpy } = makeSut();
    checkFormByEmailRepositorySpy.result = true;
    const isValid = await sut.add(mockAddFormParams());
    expect(isValid).toBe(false);
  });

  test("Should call CheckFormByEmailRepository with correct email", async () => {
    const { sut, checkFormByEmailRepositorySpy } = makeSut();
    const addFormParams = mockAddFormParams();
    await sut.add(addFormParams);
    expect(checkFormByEmailRepositorySpy.email).toBe(addFormParams.email);
  });
});
