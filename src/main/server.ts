import "module-alias/register";
import { PrismaClient } from "@prisma/client";

const PORT = 3001;
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(async () => {
    const { setupApp } = await import("./config/app");
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
