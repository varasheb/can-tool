//start

const canDataBuffer = [];
let isRecording = false;
let isPaused = false;

document.addEventListener("DOMContentLoaded", function () {
  const addRequestBtn = document.getElementById("rawdata-btn2");
  const pauseResumeBtn = document.getElementById("rawdata-btn3");
  const popup = document.getElementById("popup");
  const startBtn = document.getElementById("rawdata-inp-btn1");
  const idInput = document.querySelector(".rawdata-inp1-data-cnt input");
  const lengthSelect = document.getElementById("number-select");
  const recordBtn = document.getElementById("rawdata-btn6");
  const saveBtn = document.getElementById("rawdata-btn7");

  const dataInputs = document.querySelectorAll(
    ".rawdata-inp3-data-inner-txt-cnt input"
  );
  const cyclicTimeInput = document.querySelector(
    ".rawdata-inp-inner-cycle-inner-cnt input"
  );
  const countInput = document.querySelector(
    ".rawdata-inp-inner-count-cnt input"
  );
  const transmitterTableBody = document.querySelector(
    ".rawdata-transfer-inp-main-cnt tbody"
  );

  let rawData = {};
  let editingRow = null;
  function openPopup() {
    popup.style.visibility = "visible";
  }
  recordBtn.addEventListener("click", function () {
    if (!isRecording) {
      isRecording = true;
      recordBtn.textContent = "Recording...";
      console.log("Recording started!");
    } else {
      isRecording = false;
      recordBtn.textContent = "⏺Record";
      console.log("Recording stopped.");
    }
  });
  pauseResumeBtn.addEventListener("click", function () {
    if (isPaused) {
      isPaused = false;
      pauseResumeBtn.textContent = "▶️Pause";
      console.log("Recording resumed!");
    } else {
      isPaused = true;
      pauseResumeBtn.textContent = "⏸︎Resume";
      console.log("Recording paused!");
    }
  });

  saveBtn.addEventListener("click", async () => {
    const content = JSON.stringify(canDataBuffer);
    const defaultFilename = "example.txt";
    const fileType = "text"; // Ensure this is a valid file type for the filter

    try {
      const filePath = await window.electron.SaveFile(
        content,
        defaultFilename,
        fileType
      );
      console.log("File saved successfully at:", filePath);
    } catch (error) {
      console.error("Failed to save file:", error);
    }
  });
});

//----------

function updateReceiverTable(data) {
  if (!isRecording) {
    return;
  }
  const tableBody = document.getElementById("trace-table-body");

  if (!tableBody) {
    console.error("Table body not found!");
    return;
  }

  const { timeStamp, rawData } = data;

  const rawDataParts = rawData.split("  ");
  if (rawDataParts.length < 3) {
    console.error("Invalid rawData format:", rawData);
    return;
  }

  const idOfResponse = rawDataParts[2];
  const rowId = `new-row-receive-${idOfResponse}`;

  const newRow = document.createElement("tr");
  newRow.id = rowId;

  const timeCell = document.createElement("td");
  timeCell.textContent = timeStamp;
  newRow.appendChild(timeCell);

  const intervalCell = document.createElement("td");
  intervalCell.textContent = "Tx/Rx";
  newRow.appendChild(intervalCell);

  const idCell = document.createElement("td");
  idCell.textContent = idOfResponse;
  newRow.appendChild(idCell);

  const lengthCell = document.createElement("td");
  lengthCell.textContent = rawDataParts[3];
  newRow.appendChild(lengthCell);

  const dataCell = document.createElement("td");
  dataCell.innerHTML = rawData;
  newRow.appendChild(dataCell);

  tableBody.appendChild(newRow);
  canDataBuffer.push(rawData);
}

window.electron.onCANData((data) => {
  console.log(data);

  updateReceiverTable(data);
});

window.electron.onCANerror((data) => {
  alert(data);
});

// ipcMain.on("stop-tracing", (event) => {
//   if (candumpProcess) {
//     // Stop the candump process
//     candumpProcess.kill("SIGINT");
//     console.log("Tracing stopped.");

//     // After stopping tracing, prompt for save location
//     dialog
//       .showSaveDialog({
//         title: "Select Save Location for CAN Data",
//         defaultPath: "~/can_trace_log.txt",
//         buttonLabel: "Save",
//         filters: [{ name: "Text Files", extensions: ["txt"] }],
//       })
//       .then((file) => {
//         if (!file.canceled) {
//           const saveFilePath = file.filePath.toString();

//           // Write the buffered CAN data to the selected file
//           fs.writeFile(saveFilePath, canDataBuffer, (err) => {
//             if (err) console.error("Error writing to file", err);
//             else console.log("Data saved successfully.");
//           });

//           mainWindow.webContents.send("save-success", saveFilePath);
//         } else {
//           console.log("File save dialog was canceled");
//           mainWindow.webContents.send(
//             "can-error",
//             "File save dialog was canceled"
//           );
//         }
//       })
//       .catch((err) => {
//         console.error("Error showing save dialog", err);
//       });
//   }
// });
