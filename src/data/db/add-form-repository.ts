import { AddForm } from "@/domain/usecases/add-form";

export interface AddFormRepository {
  add(form: AddFormRepository.Params): Promise<AddFormRepository.Result>;
}

export namespace AddFormRepository {
  export type Params = AddForm.Params;
  export type Result = boolean;
}
