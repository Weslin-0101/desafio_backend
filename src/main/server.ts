import "module-alias/register";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { cors, bodyParse, contentType } from "@/main/middlewares";
import routes from "@/main/routes/form-routes";

const PORT = 3001;
const prisma = new PrismaClient();

const app = express();
app.use(cors);
app.use(bodyParse);
app.use(contentType);

app.use(routes);

const server = app.listen(PORT, () => {
  prisma
    .$connect()
    .then(() => console.log(`Server running at http://localhost:${PORT}`));
});

process.on("SIGINT", async () => {
  try {
    await prisma.$disconnect();
    server.close();
    console.log("Server closed");
  } catch (error) {
    console.error(`Error closing server: `, error);
  }
});
