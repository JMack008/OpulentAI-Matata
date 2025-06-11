const prisma = require("../utils/prisma");
const { SystemSettings } = require("../models/systemSettings");

async function enableBackgroundWorker() {
  try {
    await SystemSettings.updateSettings({
      experimental_live_file_sync: "enabled"
    });
    console.log("Background worker feature enabled successfully!");
  } catch (error) {
    console.error("Failed to enable background worker:", error);
  }
}

enableBackgroundWorker(); 