//start

let canDataBuffer = "";
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
      canDataBuffer = "";
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
    const content = canDataBuffer;
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
  if (isPaused) {
    return;
  }
  const tableBody = document.getElementById("trace-table-body");

  if (!tableBody) {
    console.error("Table body not found!");
    return;
  }

  const { timeStamp, rawData } = data;

  let idOfResponse = rawData.split("  ")[2].trim();
  let dlc = rawData.split("  ")[3];
  if (idOfResponse === "") idOfResponse = rawData.split("  ")[4].trim();
  if (dlc === "") dlc = rawData.split("  ")[5];

  const rowId = idOfResponse;

  const newRow = document.createElement("tr");
  newRow.id = rowId;

  const timeCell = document.createElement("td");
  timeCell.textContent = timeStamp;
  newRow.appendChild(timeCell);

  let rxtx;
  if (isIdPresent(idOfResponse)) {
    console.log(isIdPresent(idOfResponse), idOfResponse);
    rxtx = "Tx";
  } else {
    rxtx = "Rx";
  }
  console.log(isIdPresent(idOfResponse), idOfResponse);
  const rxtxCell = document.createElement("td");
  rxtxCell.textContent = rxtx;
  newRow.appendChild(rxtxCell);

  const idCell = document.createElement("td");
  idCell.textContent = idOfResponse;
  newRow.appendChild(idCell);

  const lengthCell = document.createElement("td");
  lengthCell.textContent = dlc;
  newRow.appendChild(lengthCell);

  const dataCell = document.createElement("td");
  dataCell.innerHTML = rawData;
  newRow.appendChild(dataCell);
  const newReading = `${timeStamp} ${rxtx} ${rawData}`;
  tableBody.appendChild(newRow);
  canDataBuffer += newReading + "\n";
}
function isIdPresent(id) {
  let txId = JSON.parse(localStorage.getItem("txId")) || [];
  const newplot = txId.find((value) => value == id);
  if (!newplot) {
    return false;
  }
  return true;
}

window.electron.onCANData((data) => {
  // console.log(data);
  updateReceiverTable(data);
});

window.electron.onCANerror((data) => {
  alert(data);
});
