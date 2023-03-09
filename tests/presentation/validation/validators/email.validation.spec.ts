import { InvalidParamError } from "@/presentation/errors";
import { EmailValidatorSpy } from "@/tests/presentation/validation/mocks";
import { EmailValidation } from "@/presentation/validation/validators/email-validation";

type SutTypes = {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
};

const field = "any_field";

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation(field, emailValidatorSpy);
  return {
    sut,
    emailValidatorSpy,
  };
};

describe("Email Validation", () => {
  test("Should return an error if EmailValidator returns false", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const email = "any_email@email.com";
    const error = sut.validate({ [field]: email });
    expect(error).toEqual(new InvalidParamError(field));
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    const email = "any_email@email.com";
    sut.validate({ [field]: email });
    expect(emailValidatorSpy.email).toBe(email);
  });
});
