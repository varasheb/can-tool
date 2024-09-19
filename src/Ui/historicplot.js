let plotsGraphData = [];
const orbitIdData = [];
let orbitIdDataIndex = 0;
let count = 0;
let isRunning = true;
const globalFiles = [];
let filesData = [];
let selectedFile = null;
const popup = document.getElementById("popup");
let valueIndex = null;
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
        <div class="card-body-graph-main-cnt">
          <canvas id="myChart${count}" class="mychart"></canvas>
          <div class="card-body-graph-main-cnt-value-display">
            <div class="card-body-graph-main-cnt-value-display1">
              <p class="text">Time :</p>
                <div class="card-body-graph-main-cnt-value-display1-box" id="xValue">
<p id="xValue${count}"></p>
            </div>
            </div>
            <div class="card-body-graph-main-cnt-value-display2">
              <p class="text">Data :</p>
               <div class="card-body-graph-main-cnt-value-display1-box" id="yValue">
                <p id="yValue${count}"></p>
            </div>
            </div>
          </div>
        </div>
        <div class="plots-main-graph-inner-graph-edit-cnt" id="edit-pop-btn">
          <button
            style="
              margin-left: -30px;
              width: 40px;
              height: 20px;
              margin-top: -3px;
            "
            onclick="openEditPopup(${data.id},${data.dataId},${count})"
          >
             <img style="width: 39px; height: 29px; "src="./images/edit.svg" class="logo" alt="">
          </button>
        </div>
        <div class="plots-main-graph-inner-graph-edit-cnt">
          <button
            style="margin-left: 20px; width: 33px; margin-top: -3px"
            onclick="removeplot('${count}')"
          >
            ❌
          </button>
        </div>
      </div>
      `;
    popup.style.visibility = "hidden";
    document.querySelector(".plots-main-graph-main-cnt").appendChild(newPlot);
    console.log(data);

    callChart(data.id, data.dataId, count++);
    populateSelect();
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
  const lengthOfData = parseInt(
    document.getElementById("length-of-data").value
  );
  const startBit = parseInt(document.getElementById("Start-bit").value);
  //   orbitIdDataIndex;
  orbitIdData.push({
    id: orbitIdDataIndex,
    orbId: newOrbId,
    comment: comment,
    offset: parseFloat(offset) ,
    scaling:parseFloat(scaling) ,
    byteOrder: byteOrder,
    length: parseInt(lengthOfData),
    startBit: parseInt(startBit)
  });

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
        // console.error("Skipping empty item.");
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
    //   console.log("Hex String:", hexString);
  
      if (!hexString) {
        console.error("No hex data found:", item);
        return;
      }

      let hexValues = hexString.split(" ");
    //   console.log("Original Hex Values:", hexValues);

      if (byteOrder === "little-endian") {
        hexValues = hexValues.reverse();
        // console.log("Reversed Hex Values for Little-Endian:", hexValues);
      }

      let binaryData = hexValues
        .map(hex => parseInt(hex, 16).toString(2).padStart(8, "0")) 
        .join(""); 
        // binaryData = binaryData.padEnd(64,"0")
        if (!/^[01]+$/.test(binaryData)) {
        console.error("Invalid binary data:", binaryData);
        return;
      }
       console.log(startBit+length,binaryData.length);
      if (startBit < 0 || length <= 0 || startBit + length > binaryData.length) {
        console.error("Invalid startBit or length.");
        return;
      }
      console.log(binaryData);
      let extractedBits = binaryData.slice(startBit, startBit + length);
    //   console.log("Extracted Bits:", extractedBits);
  
      let decimalValue = parseInt(extractedBits, 2);
    //   console.log("Decimal Value:", decimalValue);
  
      let floatValue = decimalValue * parseFloat(scaling) + parseFloat(offset);
    //   console.log("Final Float Value:", floatValue);
      values.push(floatValue);
    });
  
    return { timestamps, values };
  }

const globalZoomState = {
  xMin: null,
  xMax: null,
};

const globalVerticalLineState = {
  xCoord: null,
};

function syncVerticalLines(charts) {
  charts.forEach((chart) => {
    chart.update();
  });
}

function syncCharts(charts) {
  charts.forEach((chart) => {
    if (chart.scales.x) {
      chart.options.scales.x.min = globalZoomState.xMin;
      chart.options.scales.x.max = globalZoomState.xMax;
      chart.update();
    }
  });
}

function callChart(idValue, idData, chartCount) {
  try {
    const arr1 = plotsGraphData[idData];
    const newData = orbitIdData.find((item) => item.id === idValue);

    if (!arr1 || !newData) {
      console.error("Data not found for the given id values.");
      return;
    }

    const ctx = document
      .getElementById(`myChart${chartCount}`)
      .getContext("2d");
    const result = parseAndProcessData(
      arr1,
      parseInt(newData.startBit),
      parseInt(newData.length),
      parseFloat(newData.offset),
      parseFloat(newData.scaling),
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
            borderColor: (ctx) => {
              const { p0, p1 } = ctx;
              return p0.parsed.y > p1.parsed.y
                ? "rgb(192, 57, 43)"
                : p0.parsed.y < p1.parsed.y
                ? "rgb(22, 160, 133)"
                : "rgb(149, 165, 166)";
            },
          },
        },
      ],
    };

    const verticalHoverLine = {
      id: "verticalHoverLine",
      beforeDatasetsDraw(chart) {
        const {
          ctx,
          chartArea: { top, bottom, left, right },
        } = chart;
        ctx.save();
        ctx.lineWidth = 1;

        if (globalVerticalLineState.xCoord !== null) {
          ctx.beginPath();
          ctx.strokeStyle = "gray";
          ctx.moveTo(globalVerticalLineState.xCoord, top);
          ctx.lineTo(globalVerticalLineState.xCoord, bottom);
          ctx.stroke();

          const index = Math.round(
            ((globalVerticalLineState.xCoord - left) / (right - left)) *
              timeData.length
          );
          updateInfo(index, myChart, chartCount);
        }
        ctx.restore();
      },
    };

    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            reverse: false,
            ticks: {
              callback: (value, index) => data.labels[value] || value,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          zoom: {
            zoom: {
              drag: {
                enabled: true,
                backgroundColor: "#9797978f",
              },
              mode: "x",
              onZoomComplete({ chart }) {
                const visibleIndex = Math.round(
                  ((globalVerticalLineState.xCoord - chart.chartArea.left) /
                    (chart.chartArea.right - chart.chartArea.left)) *
                    chart.data.labels.length
                );
                updateInfo(visibleIndex, chart, chartCount);
                globalZoomState.xMin = chart.scales.x.min;
                globalZoomState.xMax = chart.scales.x.max;
                syncCharts(allCharts);
              },
            },
            pan: {
              enabled: true,
              mode: "x",
              onPanComplete({ chart }) {
                const visibleIndex = Math.round(
                  ((globalVerticalLineState.xCoord - chart.chartArea.left) /
                    (chart.chartArea.right - chart.chartArea.left)) *
                    chart.data.labels.length
                );
                updateInfo(visibleIndex, chart, chartCount);
                globalZoomState.xMin = chart.scales.x.min;
                globalZoomState.xMax = chart.scales.x.max;
                syncCharts(allCharts);
              },
            },
          },
        },
        onHover: (event, chartElement) => {
          if (chartElement.length) {
            valueIndex = chartElement[0].index;
            const dataPoint = chartElement[0].element;
            globalVerticalLineState.xCoord = dataPoint.x;

            const index = dataPoint.index;
            updateInfo(index, myChart, chartCount);
            syncVerticalLines(allCharts);
          }
        },
      },
      plugins: [verticalHoverLine],
    });

    allCharts.push(myChart);

    ctx.canvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      myChart.resetZoom();
      globalZoomState.xMin = null;
      globalZoomState.xMax = null;
      syncCharts(allCharts);
    });
    function updateInfo(index, chart, chartCount) {
      document.getElementById(
        `xValue${chartCount}`
      ).textContent = ` ${timeData[valueIndex]}`;
      document.getElementById(
        `yValue${chartCount}`
      ).textContent = ` ${valueData[valueIndex]}`;
    }
  } catch (error) {
    console.error("Error in callChart:", error);
  }
}

const allCharts = [];

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
    // populateSelect()
  });

function openEditPopup(idvalue, dataId, newcount) {
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
  oldPlotbtnChange.style.display = "none";
  addplotbtnChange.style.display = "block";
  comment.value = getdata.comment;
  orbId1.value = getdata.orbId;
  startBit.value = getdata.startBit;
  dataLength.value = getdata.length;
  endianSelc.value = getdata.byteOrder;
  scalingInput.value = getdata.scaling;
  offsetInput.value = getdata.offset;
  localStorage.setItem("updateplot", `${idvalue} ${dataId} ${newcount}`);
  popup.style.visibility = "visible";

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.visibility = "hidden";
    }
  });
  addplotbtnChange.addEventListener("click", () => addUpdatedPlot());
}

function addUpdatedPlot() {
  const data = localStorage.getItem("updateplot");
  if (!data) {
    return;
  }
  const dataValues = data.split(" ");
  const addplotbtnChange = document.getElementById("plots-update");
  const oldPlotbtnChange = document.getElementById("plots-add-btn1");
  const comment = document.getElementById("add-plot-comment-data");
  const orbId1 = document.getElementById("new-orbIdplot");
  const startBit = document.getElementById("Start-bit");
  const dataLength = document.getElementById("length-of-data");
  const endianSelc = document.getElementById("byte-number-select");
  const scalingInput = document.getElementById("scaling-input");
  const offsetInput = document.getElementById("Offset-input");
  orbitIdData[dataValues[0]] = {
    id: dataValues[0],
    orbId: orbId1.value,
    comment: comment.value,
    offset: parseFloat(offsetInput.value),
    scaling: parseFloat(scalingInput.value),
    byteOrder: endianSelc.value,
    length: parseInt(dataLength.value),
    startBit: parseInt(startBit.value),
  };
  newPlot = document.getElementById(`${dataValues[2]}`);
  newPlot.innerHTML = `
         <div class="plots-main-graph-inner-comment-cnt">
        <p id="mychartText${dataValues[0]}">${comment.value}</p>
      </div>
      <div class="plots-main-graph-inner-graph-cnt ${dataValues[0]}">
        <div class="card-body-graph-main-cnt">
          <canvas id="myChart${dataValues[2]}" class="mychart"></canvas>
          <div class="card-body-graph-main-cnt-value-display">
            <div class="card-body-graph-main-cnt-value-display1">
              <p class="text">Time :</p>
                <div class="card-body-graph-main-cnt-value-display1-box" id="xValue">
<p id="xValue${dataValues[2]}"></p>
            </div>
            </div>
            <div class="card-body-graph-main-cnt-value-display2">
              <p class="text">Data :</p>
               <div class="card-body-graph-main-cnt-value-display1-box" id="yValue">
                <p id="yValue${dataValues[2]}"></p>
            </div>
            </div>
          </div>
        </div>
        <div class="plots-main-graph-inner-graph-edit-cnt" id="edit-pop-btn">
          <button
            style="
              margin-left: -30px;
              width: 40px;
              height: 20px;
              margin-top: -3px;
            "
            onclick="openEditPopup(${dataValues[0]},${dataValues[1]},${dataValues[2]})"
          >
             <img style="width: 39px; height: 29px; "src="./images/edit.svg" class="logo" alt="">
          </button>
        </div>
        <div class="plots-main-graph-inner-graph-edit-cnt">
          <button
            style="margin-left: 20px; width: 33px; margin-top: -3px"
            onclick="removeplot('${dataValues[2]}')"
          >
            ❌
          </button>
        </div>
      </div>
      `;

  console.log(dataValues[0], dataValues[1], dataValues[2]);

  callChart(dataValues[0], dataValues[1], dataValues[2]);
  localStorage.removeItem("updateplot");
  populateSelect();
  popup.style.visibility = "hidden";
  addplotbtnChange.style.display = "none";
  oldPlotbtnChange.style.display = "block";
}
