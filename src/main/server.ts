import { PrismaClient } from "@prisma/client";
import { setupApp } from "./config/app";

const PORT = 3001;
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(async () => {
    const app = await setupApp();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
