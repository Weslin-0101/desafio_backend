import { FormController } from "@/presentation/controller/form/form-controller";
import {
  EmailInUseError,
  MissingParamError,
  ServerError,
} from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpes";
import { Validation } from "@/presentation/protocols";
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
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  error: Error = null;
  input: any;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}

const makeSut = (): SutTypes => {
  const addFormSpy = new AddFormSpy();
  const validationSpy = new ValidationSpy();
  const sut = new FormController(addFormSpy, validationSpy);
  return {
    sut,
    addFormSpy,
    validationSpy,
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

  test("Should return 400 if Validation return an error", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError("any_field");
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });
});
