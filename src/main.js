import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "child_process";
import { decodeFrame } from "./decodeframe.js";
import { sendCanRequest, stopInterval } from "./sendRequest.js";
import { HexConverter } from "./decodeRawFrame.js";
// import { resetCanBitrate } from "./canConnect.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
let mainWindow;
let cycleInterval = [];
let cyclicTime;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: { preload: path.join(__dirname, "./Ui/preload.js") },
  });

  mainWindow.loadFile("./Ui/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//===============================================================

ipcMain.on("send-pid", (event, pid) => {
  console.log(`Received PID: ${pid}`);
  sendCanRequest("7DF", `0201${pid}0000000000`);
});

ipcMain.on("send-raw-can-data", (event, rawData) => {
  const hexdata = rawData.data.join("");
  cyclicTime = parseInt(rawData.cyclicTime);

  if (cyclicTime >= 100) {
    const intervalID = setInterval(() => {
      sendCanRequest(rawData.id, hexdata);
    }, cyclicTime);

    cycleInterval.push(intervalID);
  }
});

ipcMain.on("stop-cyclic-request", (event, rowId) => {
  const intervalID = cycleInterval[rowId];

  if (intervalID) {
    clearInterval(intervalID);
    cycleInterval[rowId] = null;
  } else {
    console.log(`No cyclic request found for row ID: ${rowId}`);
  }
});

ipcMain.on("stop-all-the-cycle", (event, data) => {
  cycleInterval.map((intervalId) => {
    clearInterval(intervalId);
  });
  console.log("Called Refresh", data);
});

ipcMain.on("stop-cyclic-request-edit", (event, data) => {
  const { rowId, cyclicTime, id, hexdata } = data;
  console.log(data);
  if (rowId >= 0) {
    const intervalID = cycleInterval[rowId];
    clearInterval(intervalID);

    if (cyclicTime >= 100) {
      const newInterval = setInterval(() => {
        sendCanRequest(id, hexdata.split(" ").join(""));
      }, cyclicTime);

      cycleInterval[rowId] = newInterval;
      console.log("----------------+++++++", cycleInterval);
    }

    console.log("edited", rowId);
  }
});

ipcMain.on("stop-Obd2-request", (event, data) => {
  stopInterval();
  console.log("Stop The obd2 cycles");
});

ipcMain.on("send-baurdRate", async (event, baudRate) => {
  const bitrate = parseInt(baudRate + "000");
  // await resetCanBitrate(bitrate);
  console.log("Set Bit rate", bitrate);
});
ipcMain.handle(
  "dialog:saveFile",
  async (event, { content, defaultFilename, fileType }) => {
    try {
      const result = await dialog.showSaveDialog({
        title: "Save File",
        defaultPath: path.join(app.getPath("documents"), defaultFilename),
        filters: [{ name: fileType, extensions: [fileType] }],
      });

      if (!result.canceled && result.filePath) {
        fs.writeFileSync(result.filePath, content);
        return result.filePath;
      }
    } catch (error) {
      console.error("Error saving file:", error);
      throw error;
    }
  }
);
//======================================================

// const canChannel = "can0";
const canChannel = "vcan0";
const candump = spawn("candump", [canChannel]);

candump.stdout.on("data", (data) => {
  const dataString = data.toString();
  const frames = dataString.split("\n").filter((line) => line.trim() !== "");
  frames.forEach((frame) => {
    const decodedResult = decodeFrame(frame);
    console.log(`CAN message: ${frame}`);
    if (mainWindow) {
   const timeStamp=new Date().toISOString();
      const binaryData = HexConverter.hexToBinary(frame);
      const decimalData = HexConverter.hexToDecimal(frame);
      mainWindow.webContents.send("can-data", {
        timeStamp,
        ...decodedResult,
        rawData: frame,
        binaryData,
        decimalData,
        cyclicTime,
      });
    }
  });
});

candump.stderr.on("data", (data) => {
  try {
    mainWindow.webContents.send("can-error", data.toString());
    console.error(`Error: ${data.toString()}`);
  } catch (error) {
    console.error(`Error: ${data.toString()}`);
  }
});

candump.on("close", (code) => {
  console.log(`candump process exited with code ${code}`);
});
