const prisma = require("../utils/prisma");
const { SystemSettings } = require("../models/systemSettings");

async function checkAndFixSettings() {
  try {
    // First, check if the setting exists
    const setting = await prisma.system_settings.findFirst({
      where: {
        label: "experimental_live_file_sync"
      }
    });

    if (!setting) {
      console.log("Setting does not exist, creating it...");
      await prisma.system_settings.create({
        data: {
          label: "experimental_live_file_sync",
          value: "enabled"
        }
      });
      console.log("Setting created successfully!");
    } else {
      console.log("Setting exists, current value:", setting.value);
      if (setting.value !== "enabled") {
        console.log("Updating setting to enabled...");
        await prisma.system_settings.update({
          where: { id: setting.id },
          data: { value: "enabled" }
        });
        console.log("Setting updated successfully!");
      }
    }

    // Verify the setting
    const updatedSetting = await prisma.system_settings.findFirst({
      where: {
        label: "experimental_live_file_sync"
      }
    });
    console.log("Final setting value:", updatedSetting.value);
  } catch (error) {
    console.error("Error checking/fixing settings:", error);
  }
}

checkAndFixSettings(); 