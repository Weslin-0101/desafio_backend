import { FormController } from "@/presentation/controller/form/form-controller";
import { AddFormSpy } from "@/tests/presentation/mocks";

const mockRequest = (): FormController.Request => {
  return {
    name: "any_name",
    email: "any_email@email.com",
    cpf: "any_cpf",
    phone: "any_phone",
  };
};

type SutTypes = {
  sut: FormController;
  addFormSpy: AddFormSpy;
};

const makeSut = (): SutTypes => {
  const addFormSpy = new AddFormSpy();
  const sut = new FormController(addFormSpy);
  return {
    sut,
    addFormSpy,
  };
};

describe("FormController", () => {
  test("Should call AddForm with correct values", async () => {
    const { sut, addFormSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addFormSpy.addFormParams).toEqual({
      name: request.name,
      email: request.email,
      cpf: request.cpf,
      phone: request.phone,
    });
  });
});
