import { spawn, exec } from "child_process";

let cycleInterval = [];
export function sendCanRequest(canId, data) {
  // const canInterface = "can0";
  const canInterface = "vcan0";
  const command = `cansend ${canInterface} ${canId}#${data}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error sending CAN message: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  });
}

export function sendRequestForSupportedPIds(pids) {
  const intervalID = setInterval(() => {
    for (let i = 0; i < pids.length - 2; i++) {
      sendCanRequest("7DF", `0201${pids[i]["id"]}0000000000`);
    }
  }, 1000);
  cycleInterval.push(intervalID);
}

export function stopInterval() {
  cycleInterval.map((intervalId) => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  });
  cycleInterval = [];
}
