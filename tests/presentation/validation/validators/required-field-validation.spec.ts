import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/presentation/validation/validators";

const field = "any_field";

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
};

describe("RequiredFieldValidation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ invalidField: "invalid_field" });
    expect(error).toEqual(new MissingParamError(field));
  });

  test("Should no return if validation success", () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: "any_value" });
    expect(error).toBeFalsy();
  });
});
