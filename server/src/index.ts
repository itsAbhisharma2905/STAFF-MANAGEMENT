import { app } from "./app";
import { ensureDatabase } from "./repositories/jsonDatabase";

const port = Number(process.env.PORT ?? 4000);

ensureDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Staff Manager API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start API", error);
    process.exit(1);
  });
