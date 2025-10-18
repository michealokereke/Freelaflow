import { createApp } from "./app.js";
import { config } from "./config.js";
import { prisma } from "./db/prisma.js";

const app = createApp();

app.listen(config.PORT, async () => {
  console.log(`Server running on ${config.PORT}`);
  await prisma.$connect();
});
