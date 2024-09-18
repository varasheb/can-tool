let plotsGraphData = [];
const orbitIdData = [];
let orbitIdDataIndex = 0;
let count = 0;
let isRunning = true;
const globalFiles = [];
let filesData = [];
let selectedFile = null;
const popup = document.getElementById("popup");

document.addEventListener("DOMContentLoaded", function () {
  // const addplotbtnChange = document.getElementById("plots-update");
  function openPopup() {
    popup.style.visibility = "visible";
  }

  function closePopup() {
    popup.style.visibility = "hidden";
  }
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });
  populateSelect();
});

function populateSelect() {
  const selectElement = document.getElementById("plots-data-select");

  if (selectElement) {
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select the plot";
    selectElement.appendChild(defaultOption);

    if (globalFiles.length > 0) {
      globalFiles.forEach((file, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = file.name;
        selectElement.appendChild(option);
      });
    }
  }
}

function addNewPlot(data) {
  if (data) {
    const newPlot = document.createElement("div");
    newPlot.classList.add("plots-main-graph-inner-cnt");
    newPlot.id = `${count}`;
    newPlot.innerHTML = `
        <div class="plots-main-graph-inner-comment-cnt">
            <p id="mychartText${data.id}">${data.comment}</p>
        </div>
        <div class="plots-main-graph-inner-graph-cnt ${data.id}">
            <div class="card-body graph-main-cnt">
                <canvas id="myChart${count}" class='mychart'></canvas>
            </div>
           <div class="plots-main-graph-inner-graph-edit-cnt" id="edit-pop-btn">
          <button style="margin-left: -30px; width: 40px; height: 20px; margin-top: -3px;" 
                  onclick='openEditPopup(${data.id},${data.dataId},${count})'>
            Edit
          </button>
      </div>
            <div class="plots-main-graph-inner-graph-edit-cnt">
                <button style= " margin-left: 20px; width : 33px; margin-top: -3px;" onclick="removeplot('${count}')">❌</button>
            </div>
        </div>
      `;
    popup.style.visibility = "hidden";
    document.querySelector(".plots-main-graph-main-cnt").appendChild(newPlot);
    console.log(data);

    callChart(data.id, data.dataId, count++);
  }
}

function callme(data) {
  // console.log('call me func');

  const addplotbtnChange = document.getElementById("plots-add-btn1");
  if (addplotbtnChange.innerText == "Update Plot") {
    return;
  }

  const newOrbId = document.getElementById("new-orbIdplot").value;
  const dataId = document.getElementById("plots-data-select").value;

  const comment = document.getElementById("add-plot-comment-data").value;
  const offset = parseFloat(document.getElementById("Offset-input").value);
  const scaling = parseFloat(document.getElementById("scaling-input").value);
  const byteOrder = document.getElementById("byte-number-select").value;
  const interval = document.getElementById("Interval-select").value;
  const lengthOfData = parseInt(
    document.getElementById("length-of-data").value
  );
  const startBit = parseInt(document.getElementById("Start-bit").value);
  //   orbitIdDataIndex;
  orbitIdData.push({
    id: orbitIdDataIndex,
    orbId: newOrbId,
    comment: comment,
    offset: offset,
    scaling: scaling,
    byteOrder: byteOrder,
    length: lengthOfData,
    startBit: startBit,
    interval: interval,
  });
  //   localStorage.setItem("plotsData", JSON.stringify(loaclData));
  let plotpopup = document.getElementById("plotpopup");
  if (plotpopup) {
    plotpopup.style.visibility = "hidden";
  }
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.visibility = "hidden";
  }
  //   populateSelect();
  addNewPlot({
    id: orbitIdDataIndex++,
    dataId: dataId,
    orbId: newOrbId,
    comment: comment,
    offset: offset,
    scaling: scaling,
    byteOrder: byteOrder,
    length: lengthOfData,
    startBit: startBit,
    interval: interval,
  });
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
}

function callChart(idValue, idData, count) {
  const arr1 = plotsGraphData[idData];
  console.log(idData,plotsGraphData,arr1);
  const newData = orbitIdData.find((items) => items.id == idValue);
  console.log(newData);

  const ctx = document.getElementById(`myChart${count}`).getContext("2d");
  const down = (ctx) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? "rgb(192, 57, 43)" : undefined;
  const up = (ctx) =>
    ctx.p0.parsed.y < ctx.p1.parsed.y ? "rgb(22, 160, 133)" : undefined;
  const stagnate = (ctx) =>
    ctx.p0.parsed.y === ctx.p1.parsed.y ? "rgb(149, 165, 166)" : undefined;

  function parseAndProcessData(
    arr,
    startBit,
    length,
    offset,
    scaling,
    byteOrder,
    orbid
  ) {
    const timestamps = [];
    const values = [];

    arr.forEach((item) => {
      if (!item.trim()) {
        console.error("Skipping empty item.");
        return;
      }

      const parts = item.split(" ");
      console.log("Parts:", parts);

      if (parts.length < 8) {
        console.error("Unexpected format:", item);
        return;
      }

      const itemOrbid = parts[6];
      console.log("Extracted orbid:", itemOrbid);

      if (itemOrbid !== orbid) {
        return;
      }

      const timestamp = parts[0].split("T");
      timestamps.push(timestamp[1].slice(0, -1));

      const hexString = item.split("] ")[1]?.trim();
      console.log("Hex String:", hexString);

      if (!hexString) {
        console.error("No hex data found:", item);
        return;
      }

      const continuousHex = hexString.replace(/ /g, "");
      console.log("Continuous Hex:", continuousHex);

      let binaryData = parseInt(continuousHex, 16).toString(2);
      binaryData = binaryData.padStart(
        8 * Math.ceil(continuousHex.length / 2),
        "0"
      );
      console.log("Padded Binary Data:", binaryData);

      if (!/^[01]+$/.test(binaryData)) {
        console.error("Invalid binary data:", binaryData);
        return;
      }

      if (
        startBit < 0 ||
        length <= 0 ||
        startBit + length > binaryData.length
      ) {
        console.error("Invalid startBit or length.");
        return;
      }

      let extractedBits = binaryData.slice(startBit, startBit + length);
      console.log("Extracted Bits:", extractedBits);

      if (byteOrder === "little-endian") {
        let bytes = [];
        for (let i = 0; i < extractedBits.length; i += 8) {
          bytes.push(extractedBits.slice(i, i + 8));
        }
        bytes.reverse();
        extractedBits = bytes.join("");
        console.log("Reversed Bits for Little-Endian:", extractedBits);
      }

      let decimalValue = parseInt(extractedBits, 2);
      console.log("Decimal Value:", decimalValue);

      let floatValue = decimalValue * scaling + offset;
      values.push(floatValue);
    });

    return { timestamps, values };
  }

  const result = parseAndProcessData(
    arr1,
    newData.startBit,
    newData.length,
    newData.offset,
    newData.scaling,
    newData.byteOrder,
    newData.orbId
  );
  console.log(result);

  const timeData = result.timestamps;
  const valueData = result.values;

  const data = {
    labels: timeData,
    datasets: [
      {
        label: newData.orbId,
        data: valueData,
        borderWidth: 2,
        lineTension: 0,
        segment: {
          borderColor: (ctx) =>
            down(ctx) || up(ctx) || stagnate(ctx) || "rgb(149, 165, 149)",
        },
      },
    ],
  };

  const myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          reverse: false,
          ticks: {
            callback: function (value, index, values) {
              return data.labels[index] || value;
            },
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.0000000000001,
            },
            mode: "x",
          },
        },
      },
    },
  });
}

function readFile() {
  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const content = event.target.result;
      plotsGraphData.push([...content.split("\n")]);
    };

    reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsText(selectedFile);
  } else {
    alert("Please select a file from the dropdown.");
  }
}

document
  .getElementById("fileInput")
  .addEventListener("change", handleFileInputChange);

function handleFileInputChange(event) {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    globalFiles.push(files[i]);
  }
  console.log("Global files:", globalFiles);
  populateSelect();
}

document
  .getElementById("plots-data-select")
  .addEventListener("change", function (event) {
    const index = parseInt(event.target.value);

    if (index >= 0) {
      console.log(index);
      selectedFile = globalFiles[index];
      popup.style.visibility = "visible";
      readFile();
    }
  });

function openEditPopup(idvalue,dataId, newcount) {
  console.log(idvalue, "Editing plot", newcount);
  const getdata = orbitIdData.find((items) => items.id == idvalue);
  const popup = document.getElementById("popup");
  const comment = document.getElementById("add-plot-comment-data");
  const orbId1 = document.getElementById("new-orbIdplot");
  const startBit = document.getElementById("Start-bit");
  const dataLength = document.getElementById("length-of-data");
  const endianSelc = document.getElementById("byte-number-select");
  const scalingInput = document.getElementById("scaling-input");
  const offsetInput = document.getElementById("Offset-input");
  const addplotbtnChange = document.getElementById("plots-update");
  const oldPlotbtnChange = document.getElementById("plots-add-btn1");
  oldPlotbtnChange.style.display='none'
  addplotbtnChange.style.display = "block";
  comment.value = getdata.comment;
  orbId1.value = getdata.orbId;
  startBit.value = getdata.startBit;
  dataLength.value = getdata.length;
  endianSelc.value = getdata.byteOrder;
  scalingInput.value = getdata.scaling;
  offsetInput.value = getdata.offset;

  popup.style.visibility = "visible";

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.visibility = "hidden";
    }
  });
  addplotbtnChange.addEventListener("click", ()=> addUpdatedPlot(idvalue, dataId, newcount));
}

function addUpdatedPlot(idValue, dataId,countValue) {
  const addplotbtnChange = document.getElementById("plots-update");
  const oldPlotbtnChange = document.getElementById("plots-add-btn1");
  const comment = document.getElementById("add-plot-comment-data");
  const orbId1 = document.getElementById("new-orbIdplot");
  const startBit = document.getElementById("Start-bit");
  const dataLength = document.getElementById("length-of-data");
  const endianSelc = document.getElementById("byte-number-select");
  const scalingInput = document.getElementById("scaling-input");
  const offsetInput = document.getElementById("Offset-input");
  orbitIdData[idValue] = {
    id: idValue,
    orbId: orbId1.value,
    comment: comment.value,
    offset: offsetInput.value,
    scaling: scalingInput.value,
    byteOrder: endianSelc.value,
    length: dataLength.value,
    startBit: startBit.value,
  };
  newPlot = document.getElementById(`${countValue}`);
  newPlot.innerHTML = `
        <div class="plots-main-graph-inner-comment-cnt">
            <p id="mychartText${idValue}">${comment.value}</p>
        </div>
        <div class="plots-main-graph-inner-graph-cnt ${idValue}">
            <div class="card-body graph-main-cnt">
                <canvas id="myChart${countValue}" class='mychart'></canvas>
            </div>
           <div class="plots-main-graph-inner-graph-edit-cnt" id="edit-pop-btn">
          <button style="margin-left: -30px; width: 40px; height: 20px; margin-top: -3px;" 
                  onclick='openEditPopup(${idValue},${countValue})'>
            Edit
          </button>
      </div>
            <div class="plots-main-graph-inner-graph-edit-cnt">
                <button style= " margin-left: 20px; width : 33px; margin-top: -3px;" onclick="removeplot('${countValue}')">❌</button>
            </div>
        </div>
      `;
  // popup.style.visibility = "hidden";
  // console.log(orbitIdData);
  
  console.log(idValue, dataId, countValue);
  
  callChart(idValue, dataId, countValue);
  populateSelect();
  popup.style.visibility = "hidden";
  addplotbtnChange.style.display = "none";
  oldPlotbtnChange.style.display = "block";
}
