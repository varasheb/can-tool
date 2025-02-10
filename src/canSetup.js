import { spawn, exec } from "child_process";

function listCanDevices() {
  exec("ip link show", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    const lines = stdout.split("\n");
    const canDevices = lines
      .filter(line => line.includes("can"))
      .map(line => line.trim());

    if (canDevices.length > 0) {
      console.log("Available CAN devices:");
      canDevices.forEach(device => console.log(device));
    } else {
      console.log("No CAN devices found.");
    }
  });
}

listCanDevices();
