import { EmailValidatorAdapter } from "@/infra/validators/email-validator-adapter";
import { Validation } from "@/presentation/protocols";
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/presentation/validation/validators";

export const makeAddFormValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "cpf", "phone"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
