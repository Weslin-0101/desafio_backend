import { ServerError } from "@/presentation/errors";
import { HttpResponse } from "@/presentation/protocols";

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});
