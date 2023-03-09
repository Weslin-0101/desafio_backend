import { AddForm } from "@/domain/usecases/add-form";
import { mockAddFormModel } from "@/tests/domain/mocks";
import { FormController } from "@/presentation/controller/form/form-controller";

class AddFormSpy implements AddForm {
  form = mockAddFormModel();
  addFormParams: AddForm.Params;

  async add(form: AddForm.Params): Promise<AddForm.Result> {
    this.addFormParams = form;
    return Promise.resolve(this.form);
  }
}

const mockRequest = (): FormController.Request => {
  return {
    name: "any_name",
    email: "any_email@email.com",
    cpf: "any_cpf",
    phone: "any_phone",
  };
};

describe("FormController", () => {
  test("Should call AddForm with correct values", async () => {
    const addFormSpy = new AddFormSpy();
    const sut = new FormController(addFormSpy);
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
