import { spawn } from "child_process";

export function setupCAN(bitrate) {
  const canChannel = "can0";
  const linkSetUp = spawn("ip", [
    "link",
    "set",
    canChannel,
    "up",
    "type",
    "can",
    "bitrate",
    bitrate,
  ]);

  linkSetUp.stderr.on("data", (data) => {
    console.error(`Error setting up CAN interface: ${data}`);
  });

  linkSetUp.on("close", (code) => {
    if (code === 0) {
      console.log(`Successfully set up ${canChannel} with bitrate ${bitrate}`);
    } else {
      console.error(`Failed to set up ${canChannel} with code ${code}`);
    }
  });
}
