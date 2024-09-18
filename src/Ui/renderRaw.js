//start

let transferRows = [];
function storeOrUpdateTransferRow(rowId, rawData) {
  const existingRowIndex = transferRows.findIndex((row) => row.rowId === rowId);

  if (existingRowIndex !== -1) {
    transferRows[existingRowIndex] = rawData;
  } else {
    transferRows.push(rawData);
  }

  console.log("Updated transferRows array:", transferRows);
}

let countid = 0;
function getRowId() {
  if (countid == 0) {
    countid++;
    return 0;
  }
  return countid++;
}

document.addEventListener("DOMContentLoaded", function () {
  const addRequestBtn = document.getElementById("rawdata-btn2");
  const popup = document.getElementById("popup");
  const startBtn = document.getElementById("rawdata-inp-btn1");
  const idInput = document.querySelector(".rawdata-inp1-data-cnt input");
  const lengthSelect = document.getElementById("number-select");
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

  function closePopup() {
    popup.style.visibility = "hidden";
  }
  // if (addplot.addEventListener("click", addPlotToLocal)) {
  // // }

  addRequestBtn.addEventListener("click", function () {
    editingRow = null;
    idInput.value = "";
    lengthSelect.value = "";
    dataInputs.forEach((input) => (input.value = ""));
    cyclicTimeInput.value = "";
    openPopup();
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  startBtn.addEventListener("click", function () {
    if ((idInput.value.length === 3 && parseInt(idInput.value, 16)<=0x7FF)|| idInput.value.length === 8) {
      rawData.id = idInput.value;
    } else if (idInput.value.length < 3) {
      rawData.id = idInput.value.padStart(3, "0");
    } else if (idInput.value.length > 3 && idInput.value.length < 8) {
      rawData.id = idInput.value.padStart(8, "0");
    } else{
      rawData.id = idInput.value.padStart(8,"0");
    }
    rawData.length = lengthSelect.value;
    rawData.data = Array.from(dataInputs).map((input) => {
      if (input.value) {
        return input.value;
      }
      return "00";
    });
    rawData.cyclicTime = cyclicTimeInput.value;
    //-----------------------------------------------------------------------------
    if (editingRow) {
      editingRow.cells[0].textContent = rawData.id;
      editingRow.cells[1].textContent = rawData.length;
      editingRow.cells[2].textContent = rawData.data.join(" ");
      editingRow.cells[3].textContent = rawData.cyclicTime;

      const updatedRowData = {
        rowId: editingRow.id,
        id: rawData.id,
        length: rawData.length,
        hexdata: rawData.data.join(" "),
        cyclicTime: rawData.cyclicTime,
      };
      storeOrUpdateTransferRow(editingRow.id, updatedRowData);

      editCycle(editingRow);
    } else {
      const newRow = transmitterTableBody.insertRow();
      newRow.id = getRowId();
      newRow.insertCell(0).textContent = rawData.id;
      newRow.insertCell(1).textContent = rawData.length;
      newRow.insertCell(2).textContent = rawData.data.join(" ");
      newRow.insertCell(3).textContent = rawData.cyclicTime;
      newRow.insertCell(4).textContent = 0;
      const removeCell = newRow.insertCell(5);
      removeCell.innerHTML = `<p onclick="removetablerow('${newRow.id}', this)">❌</p>`;
      const newRowData = {
        rowId: newRow.id,
        id: rawData.id,
        length: rawData.length,
        hexdata: rawData.data.join(" "),
        cyclicTime: rawData.cyclicTime,
      };

      storeOrUpdateTransferRow(newRow.id, newRowData);
      startCycle(rawData);
      newRow.cells[2].addEventListener("click", () => {
        populatePopupForEdit(newRow);
        console.log(newRow);
      });
      console.log(newRow);
    }
    let txId = localStorage.getItem("txId");

    if (!txId) {
      txId = [];
    } else {
      txId = JSON.parse(txId);
    }
    const newId = rawData.id;
    if (!txId.includes(newId)) {
      txId.push(newId);
    }
    localStorage.setItem("txId", JSON.stringify(txId));

    closePopup();
  });

  function populatePopupForEdit(row) {
    editingRow = row;
    idInput.value = row.cells[0].textContent;
    lengthSelect.value = row.cells[1].textContent;
    const data = row.cells[2].textContent.split(" ");
    dataInputs.forEach((input, index) => {
      input.value = data[index] || "";
    });
    cyclicTimeInput.value = row.cells[3].textContent;

    console.log(`Editing row index: ${row.id}`);

    openPopup();
  }

  function stopCycle(row) {
    window.electron.sendRowNumber(row.id);
  }

  function startCycle(rawData) {
    window.electron.sendRawCANData(rawData);
  }
  function editCycle(row) {
    const rawdata = {
      rowId: row.id,
      cyclicTime: row.cells[3].textContent.trim(),
      id: row.cells[0].textContent.trim(),
      hexdata: row.cells[2].textContent.trim(),
    };
    console.log(rawdata);
    window.electron.sendRowNumberEditing(rawdata);
  }
});

//----------

function updateReceiverTable(data) {
  const tableBody = document.getElementById("receiver-table-body");
  const typeOfResponse = document.getElementById("number-type-output").value;
  let value = null;

  const { timeStamp, binaryData, decimalData, rawData } = data;
  // console.log("-->", data);

  let idOfResponse = rawData.split("  ")[2];
  let dlc = rawData.split("  ")[3];
  if (idOfResponse === "") idOfResponse = rawData.split("  ")[4];
  if (dlc === "") dlc = rawData.split("  ")[5];

  const rowId = idOfResponse;

  let existingRow = document.getElementById(rowId);
  let timeDifference = null;

  switch (typeOfResponse) {
    case "binaryData":
      value = binaryData;
      break;
    case "decimalData":
      value = decimalData;
      break;
    case "rawData":
      value = rawData;
      break;
    default:
      console.error("Invalid typeOfResponse:", typeOfResponse);
      return;
  }

  if (existingRow) {
    const previousTime = new Date(existingRow.cells[0].textContent);
    const currentTime = new Date(timeStamp);
    timeDifference = currentTime - previousTime;

    const existingValueCell = existingRow.cells[3];
    const existingValue = existingValueCell.textContent;

    const newValue = value.includes("]")
      ? value.slice(value.indexOf("]") + 1).trim()
      : value;

    existingRow.cells[0].textContent = timeStamp;
    existingRow.cells[2].textContent = dlc;
    existingRow.cells[4].textContent = `${timeDifference} ms`;
    existingRow.cells[5].textContent =
      parseInt(existingRow.cells[5].textContent, 10) + 1;

    if (existingValue !== newValue) {
      const changedPart = getChangedPart(existingValue, newValue);
      existingValueCell.innerHTML = changedPart;
    }
  } else {
    const newRow = document.createElement("tr");
    newRow.id = rowId;

    const timeCell = document.createElement("td");
    timeCell.textContent = timeStamp;
    newRow.appendChild(timeCell);

    const idCell = document.createElement("td");
    idCell.textContent = idOfResponse;
    newRow.appendChild(idCell);

    const lengthCell = document.createElement("td");
    lengthCell.textContent = dlc;
    newRow.appendChild(lengthCell);

    const dataCell = document.createElement("td");
    dataCell.innerHTML = value.includes("]")
      ? value.slice(value.indexOf("]") + 1).trim()
      : value;
    newRow.appendChild(dataCell);

    const intervalCell = document.createElement("td");
    intervalCell.textContent = "N/A";
    newRow.appendChild(intervalCell);

    const countCell = document.createElement("td");
    countCell.classList.add("count-class");
    countCell.textContent = "1";
    countCell.id = idOfResponse;
    newRow.appendChild(countCell);

    const plotCell = document.createElement("td");
    plotCell.innerHTML = ` <button id="plots-add-btn" onclick="popupcontainer('${rowId}')">+
      </button>`;
    newRow.appendChild(plotCell);

    tableBody.appendChild(newRow);
  }
}

function getChangedPart(oldValue, newValue) {
  let html = "";
  const maxLength = Math.max(oldValue.length, newValue.length);

  for (let i = 0; i < maxLength; i++) {
    const oldChar = oldValue[i] || "";
    const newChar = newValue[i] || "";

    if (oldChar === newChar) {
      html += newChar;
    } else {
      html += `<span class="twinkle">${newChar}</span>`;
    }
  }
  return html;
}
function checkDataWithTable(arbId) {
  const rows = document.querySelectorAll("#data-table-body tr");

  for (let row of rows) {
    const idCell = row.querySelector("td:first-child");
    const countCell = row.querySelector("td:nth-child(5)");

    if (idCell && idCell.textContent.trim() === arbId) {
      let count = parseInt(countCell.textContent) || 0;
      countCell.textContent = count + 1;
      return false;
    }
  }
  return true;
}

window.electron.onCANData((data) => {
  // console.log(data);

  const arbId = data?.decimalData.split(" ")[1];
  if (checkDataWithTable(arbId)) updateReceiverTable(data);
});

window.electron.onCANerror((data) => {
  alert(data);
});

function validateHex(input) {
  input.value = input.value.toUpperCase();
  const hexPattern = /^[0-9A-F]{0,2}$/;
  if (!hexPattern.test(input.value)) {
    input.value = input.value.slice(0, -1);
  }
}

function validateId(input) {
  input.value = input.value.toUpperCase();

  const hexPattern = /^[0-9A-F]{0,8}$/;
  if (!hexPattern.test(input.value)) {
    input.value = input.value.slice(0, -1);
  }
}

function removetablerow(row, element) {
  const rowToRemove = element.closest("tr");
  console.log("0--", row);
  if (rowToRemove) {
    window.electron.sendRowNumber(row);
    // console.log(`Removing row at index: ${rowIndex}`);
    rowToRemove.remove();
  } else {
    console.log(`Row not found.`);
  }
}

document
  .querySelector(".rawdata-refresh-btn")
  .addEventListener("click", function () {
    console.log("refresh button is clicked");

    const transferCounts = document.querySelectorAll(
      "#data-table-body td:nth-child(5)"
    );
    transferCounts.forEach(function (ele) {
      ele.textContent = "0";
    });
    const receiverCounts = document.querySelectorAll(
      "#receiver-table-body .count-class"
    );
    receiverCounts.forEach(function (ele) {
      ele.textContent = "0";
    });
  });

const toggleAction = document.querySelector(".rawdata-toggle-btn");
const toggleText = document.querySelector(".rawdata-toggle-btn-txt");

toggleAction.addEventListener("click", function () {
  if (toggleText.textContent === "⏸︎ Pause") {
    toggleText.textContent = "⏵︎ Resume";
    window.electron.sendRefreshRawCan();
    console.log("pause button is clicked");
  } else {
    toggleText.textContent = "⏸︎ Pause";
    unfreezData();
    console.log("resume button is clicked");
  }
});

function unfreezData() {
  transferRows.map((data) => {
    console.log(data);
    window.electron.sendRowNumberEditing(data);
  });
}

function popupcontainer(id) {
  let plotData = document.getElementById(id);
  // console.log(plotData);
  let plotpopup = document.getElementById("plotpopup");
  // const plotpopup = document.querySelector(".rawdata-user-popup1-main-cnt");
  let idValue = document.getElementById("new-orbIdplot");
  idValue.value = plotData.cells[1].textContent;

  openPlotpopUp();
  window.addEventListener("click", function (event) {
    if (event.target === plotpopup) {
      closePlotpopUp();
    }
  });
  function openPlotpopUp() {
    plotpopup.style.visibility = "visible";
  }

  function closePlotpopUp() {
    plotpopup.style.visibility = "hidden";
  }
}

function validateLength(input) {
  const value = input.value;
  if (value < 0) {
    input.value = "";
  }

  if (value > 31) {
    input.value = "";
  }
}

function validateStartBit(input) {
  const value = input.value;
  if (value < 0) {
    input.value = "";
  }

  if (value > 63) {
    input.value = "";
  }
}
