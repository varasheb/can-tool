let plotsGraphData = [];
const orbitIdData = [];
let count = 0;
let isRunning = true;
let incomingData = {};

document.addEventListener("DOMContentLoaded", function () {
  let graphData = [];
  const btn = document.getElementById("plots-add-btn");
  if (!btn) {
    return;
  }
  const popup = document.getElementById("popup");
  const addplotbtn = document.getElementById("plots-add-btn1");


  const startButton = document.getElementById("plots-start");
  if (!startButton) {
    return;
  }
  const freezeButton = document.getElementById("plots-freez");
  if (!freezeButton) {
    return;
  }
  btn.addEventListener("click", ()=>{
    openPopup()
    addplotbtn.innerText == "Add Plot"
    document.getElementById('select-orbitId-para').style.display='none'
    document.getElementById('select-orbitId').style.display='block'
    document.getElementById("add-plot-comment-data").value=''
    document.getElementById("Offset-input").value=''
    document.getElementById("scaling-input").value=''
    document.getElementById("length-of-data").value=''
    document.getElementById("Start-bit").value=''

  });
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
    console.log(id);
    
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
            <p id="mychartText${data.id}">${data.comment}</p>
        </div>
        <div class="plots-main-graph-inner-graph-cnt ${data.id}">
            <div class="card-body graph-main-cnt">
                <canvas id="myChart${count}" class='mychart'></canvas>
            </div>
           <div class="plots-main-graph-inner-graph-edit-cnt" id="edit-pop-btn">
          <button style="margin-left: -30px; width: 40px; ; margin-top: -3px;" 
                  onclick='openEditPopup(${data.id},${count})'>
                        <img src="./images/edit.svg" class="logo" alt="">
          </button>
      </div>
            <div class="plots-main-graph-inner-graph-edit-cnt">
                <button style= " margin-left: 20px; width : 33px; margin-top: -3px;" onclick="removeplot('${count}')">❌</button>
            </div>
        </div>
      `;
      closePopup();
      document.querySelector(".plots-main-graph-main-cnt").appendChild(newPlot);
      callChart(data.id,count);
    }
  }
  function openPopup() {
    popup.style.visibility = "visible";
  }

  function closePopup() {
    popup.style.visibility = "hidden";
  }

  function handleSelectChange(eventValue) {
    const selectedValue = eventValue;
    if (selectedValue && selectedValue != "Select the plot") {
      console.log(plotsGraphData);
      const plotDatas = plotsGraphData.find((plot) => plot.id == eventValue);
      console.log(plotDatas);
      addNewPlot(plotDatas);
    }
  }

  window.electron.onCANData((data) => {

    const receivedData = data?.binaryData;
    const id = receivedData?.split(" ")[1];
    incomingData[id] = data;
    const orbIdValue = orbitIdData.find((value) => value === id);
    if (!orbIdValue) {
      orbitIdData.push(id);
      populateOrbIdSelect();
    }
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

function callChart(idValue, count) {
  const newData = plotsGraphData.find(items=> items.id == idValue)
  const ctx = document
    .getElementById(`myChart${count}`)
    .getContext("2d");
  const down = (ctx) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? "rgb(192, 57, 43)" : undefined;
  const up = (ctx) =>
    ctx.p0.parsed.y < ctx.p1.parsed.y ? "rgb(22, 160, 133)" : undefined;
  const stagnate = (ctx) =>
    ctx.p0.parsed.y === ctx.p1.parsed.y ? "rgb(149, 165, 166)" : undefined;

  // Initialize the chart with 30 timestamps and no data
  const defaultLabels = Array.from({ length: 30 }, (_, i) => {
    const now = new Date();
    now.setSeconds(now.getSeconds() - (29 - i)); // Set past seconds for initialization
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  });

  const data = {
    labels: defaultLabels,
    datasets: [
      {
        label: newData.orbId,
        data: Array(30).fill(null), 
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
            callback: function(value, index, values) {
              return data.labels[index] || value; 
            },
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  function setAllIntervals() {
    setInterval(updateChart, 1000);
  }
  setAllIntervals();

  function updateChart() {
    if (!isRunning) return;
    const getdata = plotsGraphData.find(items=> items.id == idValue)
    const id = getdata.orbId;
    const dataValue = incomingData[id];
    if (dataValue) {
      const receivedData = dataValue?.binaryData;
      const value = processCANMessage(
        receivedData,
        parseInt(getdata.startBit),
        parseInt(getdata.length),
        parseFloat(getdata.offset),
        parseFloat(getdata.scaling),
        getdata.byteOrder
      );

      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      if (data.labels.length >= 30) {
        data.labels.shift(); 
        data.datasets[0].data.shift(); 
      }

      data.labels.push(timeStr); 
      data.datasets[0].data.push(value); 

      myChart.update();
    }
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

  let binaryData = canMessage.split(" ").slice(3).join("");

  if (!/^[01]+$/.test(binaryData)) {
    throw new Error("Invalid binary data. Must be a string of 0s and 1s.");
  }
  binaryData=binaryData.padEnd(64,"0")
  if (startBit < 0 || length <= 0 || startBit + length >= 64) {
    throw new Error("Invalid startBit or length.");
  }
  let extractedBits = binaryData.slice(startBit , startBit + length );
  if (byteOrder === "little-endian") {
    let bytes = [];
    for (let i = 0; i < extractedBits.length; i += 8) {
      bytes.push(extractedBits.slice(i, i + 8));
    }
    bytes.reverse();
    extractedBits = bytes.join("");
  }
  let decimalValue = parseInt(extractedBits, 2);

  let floatValue = (decimalValue * parseFloat(scaling) )+ parseFloat(offset) ;

  return floatValue;
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


function callme(data) {
  const addplotbtnChange = document.getElementById("plots-add-btn1");
  if (addplotbtnChange.innerText == "Update Plot") {
    return;
  }
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
      plotsGraphData = [];
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

function openEditPopup(idvalue, newcount) {
  console.log(idvalue, "Editing plot",newcount);
  const getdata = plotsGraphData.find(items=> items.id == idvalue)
  const popup = document.getElementById("popup");
  const comment = document.getElementById("add-plot-comment-data");
  const orbId1 = document.getElementById("select-orbitId-para");
  const orbId = document.getElementById("select-orbitId");
  const startBit = document.getElementById("Start-bit");
  const dataLength = document.getElementById("length-of-data");
  const endianSelc = document.getElementById("byte-number-select");
  const scalingInput = document.getElementById("scaling-input");
  const offsetInput = document.getElementById("Offset-input");
  const addplotbtnChange = document.getElementById("plots-add-btn1");
  addplotbtnChange.innerText = "Update Plot";
  const newValue = idvalue
  localStorage.setItem('editvalue',JSON.stringify(newValue))
  orbId.style.display='none'
  document.getElementById('select-orbitId-para').style.display='block'
  document.getElementById('select-orbitId-para').textContent= getdata.orbId

  comment.value = getdata.comment;
  orbId.value = getdata.orbId;
  startBit.value = getdata.startBit;
  dataLength.value = getdata.length;
  endianSelc.value = getdata.byteOrder;
  scalingInput.value = getdata.scaling;
  offsetInput.value = getdata.offset;

  popup.style.visibility = "visible";

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.visibility = "hidden";
      addplotbtnChange.innerText='Add plot'
    }
  });

  addplotbtnChange.addEventListener("click", () => {

    if (addplotbtnChange.innerText == "Update Plot") {
      let localUpdate = JSON.parse(localStorage.getItem("plotsData")) || [];
      console.log(plotsGraphData);
      const newEditValue = JSON.parse(localStorage.getItem('editvalue'))
      console.log(newEditValue);
      
      console.log(newEditValue,orbId1.textContent);
      localUpdate.splice(parseInt(newEditValue), 1, {
        orbId: orbId1.textContent,
        comment: comment.value,
        offset: offsetInput.value,
        scaling: scalingInput.value,
        byteOrder: endianSelc.value,
        length: dataLength.value,
        startBit: startBit.value,
      });
      plotsGraphData[newEditValue[0]]= 
        {
          id:newEditValue,
          orbId: orbId1.textContent,
          comment: comment.value,
          offset: offsetInput.value,
          scaling: scalingInput.value,
          byteOrder: endianSelc.value,
          length: dataLength.value,
          startBit: startBit.value,
        }
      localStorage.setItem("plotsData", JSON.stringify(localUpdate));
      document.getElementById(`mychartText${newEditValue}`).textContent=comment.value

      populateSelect();
      popup.style.visibility = "hidden";  

    }
    orbId1.style.display='block'
    
    document.getElementById('select-orbitId-para').style.display='none'
    addplotbtnChange.innerText = "Add Plot";
   

  });
}
