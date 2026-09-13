import "dotenv/config";

import { createApp } from "./infrastructure/web";
import { checkDBConnection } from "./infrastructure/db/connection";

const PORT = 3000;

async function startServer() {
  try {
    await checkDBConnection();

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();