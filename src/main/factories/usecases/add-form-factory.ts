import { DbAddForm } from "@/data/usecases/db-add-form";
import { AddForm } from "@/domain/usecases/add-form";
import { FormPrismaRepository } from "@/infra/db/form/form-prisma-repository";

export const makeDbAddForm = (): AddForm => {
  const formPrismaRepository = new FormPrismaRepository();
  return new DbAddForm(formPrismaRepository, formPrismaRepository);
};
