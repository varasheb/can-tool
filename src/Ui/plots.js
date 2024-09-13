const plotsGraphData = [];
const orbitIdData = [];
document.addEventListener("DOMContentLoaded", function () {
  let count = 0;

  let isRunning = true;
  let graphData = [];
  const btn = document.getElementById("plots-add-btn");
  if (!btn) {
    return;
  }
  const popup = document.getElementById("popup");
  const addPlot = document.getElementById("plots-add-btn1");
  const startButton = document.getElementById("plots-start");
  if (!startButton) {
    return;
  }
  const freezeButton = document.getElementById("plots-freez");
  if (!freezeButton) {
    return;
  }
  // addPlot.addEventListener("click", addValue);
  btn.addEventListener("click", openPopup);
  populateSelect();
  populateOrbIdSelect();
  startButton.addEventListener("click", () => {
    isRunning = true;
    console.log("Graph updates resumed.");

    graphData = [];
    const chartContainers = document.querySelectorAll(".mychart");

    chartContainers.forEach((chartContainer) => {
      const ctx = chartContainer.getContext("2d");
      const chartInstance = Chart.getChart(ctx);
      if (chartInstance) {
        chartInstance.data.labels = [];
        chartInstance.data.datasets[0].data = [];
        chartInstance.update();
      }
    });
  });

  freezeButton.addEventListener("click", () => {
    isRunning = false;
    console.log("Graph updates paused.");
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  window.removeplot = function (id) {
    const elementToRemove = document.getElementById(id);
    if (elementToRemove) {
      elementToRemove.remove();
    } else {
      console.error("Element not found.");
    }
  };

  function addNewPlot(data) {
    if (data) {
      const newPlot = document.createElement("div");
      newPlot.classList.add("plots-main-graph-inner-cnt");
      newPlot.id = `${++count}`;
      newPlot.innerHTML = `
        <div class="plots-main-graph-inner-comment-cnt">
            <p>${data.comment}</p>
        </div>
        <div class="plots-main-graph-inner-graph-cnt">
            <div class="card-body graph-main-cnt">
                <canvas id="myChart${data.id}${data.orbId}" class='mychart'></canvas>
            </div>
            <div class="plots-main-graph-inner-graph-edit-cnt">
                <button style= " margin-left: 20px; width : 33px; margin-top: -3px;" onclick="removeplot('${count}')">❌</button>
            </div>
        </div>
      `;
      closePopup();
      document.querySelector(".plots-main-graph-main-cnt").appendChild(newPlot);
      callChart(data);
    }
  }
  function openPopup() {
    popup.style.visibility = "visible";
  }

  function closePopup() {
    popup.style.visibility = "hidden";
  }

  function callChart(newData) {
    const ctx = document
      .getElementById(`myChart${newData.id}${newData.orbId}`)
      .getContext("2d");

    const down = (ctx) =>
      ctx.p0.parsed.y > ctx.p1.parsed.y ? "rgb(192, 57, 43)" : undefined;
    const up = (ctx) =>
      ctx.p0.parsed.y < ctx.p1.parsed.y ? "rgb(22, 160, 133)" : undefined;
    const stagnate = (ctx) =>
      ctx.p0.parsed.y === ctx.p1.parsed.y ? "rgb(149, 165, 166)" : undefined;

    const plotData = plotsGraphData.find((plot) => plot.id === newData.id);
    if (!plotData) return;

    const data = {
      labels: [],
      datasets: [
        {
          label: newData.orbId,
          data: [],
          borderWidth: 2,
          lineTension: 0.5,
          segment: {
            borderColor: (ctx) =>
              down(ctx) || up(ctx) || stagnate(ctx) || "rgb(149, 165, 149)", // Default color
          },
        },
      ],
    };

    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    function setAllIntervals() {
      const intervalID = setInterval(updateChart, 1000);
    }
    setAllIntervals();

    function updateChart() {
      if (!isRunning) return;
      const id = newData.orbId;
      const dataValue = incomingData[id];
      if (dataValue) {
        const receivedData = dataValue?.binaryData;
        const value = processCANMessage(
          receivedData,
          newData.startBit,
          newData.length,
          newData.offset,
          newData.scaling,
          newData.byteOrder
        );
        console.log("id--", id);
        console.log("value--", value);

        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        if (data.labels.length >= 15) {
          data.labels.shift();
          data.datasets[0].data.shift();
        }

        data.labels.push(timeStr);
        data.datasets[0].data.push(value);

        myChart.update();
      }
    }
  }

  function addValue() {
    const newOrbId = document.getElementById("new-orbId").value;
    const comment = document.getElementById("add-plot-comment-data").value;
    const offset = parseFloat(document.getElementById("Offset-input").value);
    const scaling = parseFloat(document.getElementById("scaling-input").value);
    const byteOrder = document.getElementById("byte-number-select").value;
    const lengthOfData = parseInt(
      document.getElementById("length-of-data").value
    );
    const startBit = parseInt(document.getElementById("Start-bit").value);

    if (newOrbId.trim() === "") {
      alert("Please enter a valid orbId.");
      return;
    }
    let paddedOrbId = newOrbId;
    if (newOrbId.length < 3) {
      paddedOrbId = newOrbId.padStart(3, "0");
    } else if (newOrbId.length > 3 && newOrbId.length < 8) {
      paddedOrbId = newOrbId.padStart(8, "0");
    }

    plotsData.push({
      id: getplotId(),
      orbId: paddedOrbId,
      comment: comment,
      offset: offset,
      scaling: scaling,
      byteOrder: byteOrder,
      length: lengthOfData,
      startBit: startBit,
    });

    populateSelect();
    document.getElementById("new-orbId").value = "";

    closePopup();
  }

  function handleSelectChange(eventValue) {
    const selectedValue = eventValue;
    if (selectedValue && selectedValue != "Select the plot") {
      // console.log(plotsData);
      const plotDatas = plotsGraphData.find((plot) => plot.id == eventValue);
      console.log(plotDatas);
      addNewPlot(plotDatas);
    }
  }

  function processCANMessage(
    canMessage,
    startBit,
    length,
    offset,
    scaling,
    byteOrder
  ) {
    const binaryData = canMessage.split(" ").slice(3).join("");

    if (!/^[01]+$/.test(binaryData)) {
      throw new Error("Invalid binary data. Must be a string of 0s and 1s.");
    }

    if (startBit < 0 || length <= 0 || startBit + length > binaryData.length) {
      throw new Error("Invalid startBit or length.");
    }
    let extractedBits = binaryData.slice(startBit, startBit + length);
    if (byteOrder === "little-endian") {
      let bytes = [];
      for (let i = 0; i < extractedBits.length; i += 8) {
        bytes.push(extractedBits.slice(i, i + 8));
      }
      bytes.reverse();
      extractedBits = bytes.join("");
    }
    let decimalValue = parseInt(extractedBits, 2);

    let floatValue = decimalValue * scaling + offset;

    return floatValue;
  }

  let incomingData = {};
  window.electron.onCANData((data) => {
    const receivedData = data?.binaryData;
    const id = receivedData?.split(" ")[1];
    incomingData[id] = data;
    const orbIdValue = orbitIdData.find((value) => value === id);
    if (!orbIdValue) {
      orbitIdData.push(id);
      populateOrbIdSelect();
    }
    // console.log(incomingData);
  });

  populateSelect();
  document
    .getElementById("plots-data-select")
    .addEventListener("change", () => {
      const value = document.getElementById("plots-data-select");
      console.log(value);

      handleSelectChange(value.value);
    });
});

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

function callme(data) {
  const loaclData = JSON.parse(localStorage.getItem("plotsData")) || [];
  let newOrbId = null;
  if (data === "plotsdata") {
    newOrbId = document.getElementById("select-orbitId").value;
  } else {
    newOrbId = document.getElementById("new-orbIdplot").value;
  }
  const comment = document.getElementById("add-plot-comment-data").value;
  const offset = parseFloat(document.getElementById("Offset-input").value);
  const scaling = parseFloat(document.getElementById("scaling-input").value);
  const byteOrder = document.getElementById("byte-number-select").value;
  const lengthOfData = parseInt(
    document.getElementById("length-of-data").value
  );
  const startBit = parseInt(document.getElementById("Start-bit").value);

  loaclData.push({
    orbId: newOrbId,
    comment: comment,
    offset: offset,
    scaling: scaling,
    byteOrder: byteOrder,
    length: lengthOfData,
    startBit: startBit,
  });
  localStorage.setItem("plotsData", JSON.stringify(loaclData));
  let plotpopup = document.getElementById("plotpopup");
  if (plotpopup) {
    plotpopup.style.visibility = "hidden";
  }
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.visibility = "hidden";
  }
  populateSelect();
}

function populateSelect() {
  const selectElement = document.getElementById("plots-data-select");
  if (selectElement) {
    selectElement.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select the plot";
    selectElement.appendChild(defaultOption);
    const newPlotsData = JSON.parse(localStorage.getItem("plotsData"));
    if (newPlotsData) {
      newPlotsData.forEach((plot, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${plot.comment} (${plot.orbId})`;
        selectElement.appendChild(option);
        plotsGraphData.push({
          id: index,
          ...plot,
        });
      });
    }
  }
}
function populateOrbIdSelect() {
  const selectElement = document.getElementById("select-orbitId");
  if (selectElement) {
    selectElement.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select the orbId";
    selectElement.appendChild(defaultOption);
    if (orbitIdData) {
      orbitIdData.forEach((plot) => {
        const option = document.createElement("option");
        option.value = plot;
        option.textContent = plot;
        selectElement.appendChild(option);
      });
    }
  }
}
// Pause chart updates on hover
document.getElementById("myChart").addEventListener("mouseenter", function () {
  isRunning = false;
});

// Resume chart updates when not hovering
document.getElementById("myChart").addEventListener("mouseleave", function () {
  isRunning = true;
});
