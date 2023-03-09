import { AddFormRepository } from "@/data/db/add-form-repository";
import { CheckFormEmailRepository } from "@/data/db/check-form-email-respository";
import { PrismaClient } from "@prisma/client";

export class FormPrismaRepository
  implements AddFormRepository, CheckFormEmailRepository
{
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

  async checkByEmail(email: string): Promise<boolean> {
    const prisma = new PrismaClient();
    const form = await prisma.form.findFirst({
      where: {
        email,
      },
    });

    return form !== null;
  }
}
