const prisma = require("../utils/prisma");
const { SystemSettings } = require("../models/systemSettings");
const { DocumentSyncQueue } = require("../models/documentSyncQueue");

async function debugSettings() {
  try {
    // Check the setting directly in the database
    const dbSetting = await prisma.system_settings.findFirst({
      where: { label: "experimental_live_file_sync" }
    });
    console.log("Database setting:", dbSetting);

    // Check through SystemSettings.get
    const systemSetting = await SystemSettings.get({ label: "experimental_live_file_sync" });
    console.log("SystemSettings.get result:", systemSetting);

    // Check DocumentSyncQueue.enabled
    const isEnabled = await DocumentSyncQueue.enabled();
    console.log("DocumentSyncQueue.enabled result:", isEnabled);

    // Check if the setting is in supportedFields
    console.log("Is setting in supportedFields:", SystemSettings.supportedFields.includes("experimental_live_file_sync"));
  } catch (error) {
    console.error("Error debugging settings:", error);
  }
}

debugSettings(); 