import { DbAddForm } from "@/data/usecases/db-add-form";
import { mockAddFormParams } from "@/tests/domain/mocks";
import { AddFormRepositorySpy } from "@/tests/data/mocks";
import { CheckFormEmailRepository } from "../db/check-form-email-respository";

type SutTypes = {
  sut: DbAddForm;
  addFormRepositorySpy: AddFormRepositorySpy;
  checkFormByEmailRepositorySpy: CheckFormByEmailRepositorySpy;
};

class CheckFormByEmailRepositorySpy implements CheckFormEmailRepository {
  email: string;
  result = false;

  async checkByEmail(email: string): Promise<boolean> {
    this.email = email;
    return Promise.resolve(this.result);
  }
}

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
});