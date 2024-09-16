import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

async function listCanDevices() {
  try {
    const { stdout, stderr } = await execPromise("ip link show");

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return [];
    }
    const lines = stdout.split("\n");
    console.log(lines);
    const canDevices = [];
    for (const line of lines) {
      let value = line.split(":")[1];
      if (value) canDevices.push(value.trim());
    }
    console.log("CAN Devices:", canDevices);
    return canDevices;
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    return [];
  }
}

export async function setupCAN(bitrate) {
  const canChannel = "can0";

  const devices = await listCanDevices();
  console.log("Available CAN devices:", devices);

  if (!devices.includes(canChannel)) {
    console.error(`CAN device ${canChannel} is not available.`);
    return;
  }

  try {
    const { stdout } = await execPromise(`ip link show ${canChannel}`);
    if (stdout.includes("state UP")) {
      console.log(`${canChannel} is already up.`);
    } else {
      console.log(`${canChannel} is down. Bringing it up.`);
      await execPromise(`ip link set ${canChannel} up`);
      console.log(`${canChannel} is now up.`);
    }

    await configureBitrate(canChannel, bitrate);
  } catch (error) {
    console.error(`Error checking device status: ${error}`);
  }
}

async function configureBitrate(canChannel, bitrate) {
  try {
    await execPromise(`ip link set ${canChannel} type can bitrate ${bitrate}`);
    console.log(`Successfully set up ${canChannel} with bitrate ${bitrate}`);
  } catch (error) {
    console.error(`Error configuring bitrate for ${canChannel}: ${error}`);
  }
}

export async function resetCanBitrate(newBitrate) {
  try {
    const devices = await listCanDevices();

    if (devices.length === 0) {
      console.error("No CAN devices available.");
      return;
    }
    const canChannel = devices[0];
    console.log(`Using CAN device ${canChannel}`);
    await execPromise(`sudo ip link set ${canChannel} down`);
    await execPromise(
      `sudo ip link set ${canChannel} type can bitrate ${newBitrate}`
    );
    await execPromise(`sudo ip link set ${canChannel} up`);

    console.log(
      `${canChannel} bitrate reset to ${newBitrate} and device brought up.`
    );
  } catch (error) {
    console.error(`Error resetting bitrate: ${error}`);
  }
}

(async () => {
  await setupCAN(500000);
})();
