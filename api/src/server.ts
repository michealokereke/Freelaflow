import { createApp } from "./app.js";
import { config } from "./config.js";
import { prisma } from "./db/prisma.js";

const app = createApp();

app.listen(config.PORT, async () => {
  await prisma.$connect();
  console.log(`Server running on ${config.PORT}`);
});
