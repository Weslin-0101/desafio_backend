import { MissingParamError } from "@/presentation/errors";
import { ValidationComposite } from "@/presentation/validation/validators";
import { ValidationSpy } from "../mocks";

type SutTypes = {
  sut: ValidationComposite;
  validationSpies: ValidationSpy[];
};

const field = "any_field";

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()];
  const sut = new ValidationComposite(validationSpies);
  return {
    sut,
    validationSpies,
  };
};

describe("ValidationComposite", () => {
  test("Should return an error if any validation fails", () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[1].error = new MissingParamError(field);
    const error = sut.validate({ [field]: "any_value" });
    expect(error).toEqual(validationSpies[1].error);
  });
});
