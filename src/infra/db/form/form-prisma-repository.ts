import { AddFormRepository } from "@/data/db/add-form-repository";
import { PrismaClient } from "@prisma/client";

export class FormPrismaRepository implements AddFormRepository {
  async add(form: AddFormRepository.Params): Promise<AddFormRepository.Result> {
    const prisma = new PrismaClient();
    const result = await prisma.form.create({
      data: form,
    });

    const parseId = result.id.toString();
    return {
      id: parseId,
      name: result.name,
      email: result.email,
      cpf: result.cpf,
      phone: result.phone,
    };
  }
}
