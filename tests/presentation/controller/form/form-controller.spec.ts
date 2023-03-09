import { FormController } from "@/presentation/controller/form/form-controller";
import { EmailInUseError, ServerError } from "@/presentation/errors";
import { forbidden, ok, serverError } from "@/presentation/helpes";
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

const throwError = (): never => {
  throw new Error();
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

  test("Should return 500 if AddForm throws", async () => {
    const { sut, addFormSpy } = makeSut();
    jest.spyOn(addFormSpy, "add").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test("Should return 403 if AddForm returns null", async () => {
    const { sut, addFormSpy } = makeSut();
    addFormSpy.form = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut, addFormSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(addFormSpy.form));
  });
});
