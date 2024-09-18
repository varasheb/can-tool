let processData;

document.getElementById("readFileButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const content = event.target.result;
      processData = processLogData(content);
      console.log(processData);
      // Document content can be updated here if needed
    };

    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsText(file);
  } else {
    alert("Please select a file.");
  }
});

function processLogData(logData) {
  const lines = logData.split("\n").filter(line => line.trim() !== "");
  const canData = {};
  const regex = /^(\S+) (Tx|Rx)\s+(\S+)\s+(\d+)\s+\[8\]\s+(.*)$/;

  lines.forEach(line => {
    const match = line.match(regex);

    if (match) {
      const [_, timestamp, txrx, can, canId, data] = match;

      if (!canData[canId]) {
        canData[canId] = {
          timestamps: [],
          data: []
        };
      }
      canData[canId].timestamps.push(new Date(timestamp)); // Convert to Date object
      canData[canId].data.push(data);
    }
  });

  return canData;
}

function plotData(data, canId) {
  if (!data[canId]) {
    alert("No data available for the provided CAN ID.");
    return;
  }

  console.log("--", data);

  // Create a new canvas element
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 200;
  document.getElementById("plotContainer").appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const chartData = {
    labels: data[canId].timestamps, // This will be used for x-axis labels
    datasets: [
      {
        label: `CAN ID ${canId}`,
        data: data[canId].timestamps.map((timestamp, index) => ({
          x: timestamp,
          y: data[canId].data[index]
            .split(" ")
            .map(hex => parseInt(hex, 16))
            .reduce((a, b) => a + b, 0)
        })),
        borderColor: getRandomColor(),
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fill: false
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second" // Adjust as needed
        },
        title: {
          display: true,
          text: "Timestamp"
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Data Value"
        }
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
            modifierKey: "ctrl"
          },
          pinch: {
            enabled: true
          },
          mode: "x" // Zoom only on the x-axis
        },
        pan: {
          enabled: true,
          mode: "x" // Pan only on the x-axis
        }
      }
    }
  };

  new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Handling popup visibility
const canidenter = document.getElementById("popFileButton");
const hisPop = document.getElementById("his-popup");
const inputType = document.getElementById("canId");
const hisAddplot = document.getElementById("his-addPlot");

hisPop.style.display = "none"; // Hide popup initially

canidenter.addEventListener("click", () => {
  hisPop.style.display = "block"; // Show popup
});

hisAddplot.addEventListener("click", () => {
  const canid = inputType.value.trim();
  console.log(canid);

  if (canid) {
    plotData(processData, canid);
    hisPop.style.display = "none"; // Hide popup after submission
  } else {
    alert("Please enter a valid CAN ID.");
  }
});

// Hide popup when clicking outside of it
window.addEventListener("click", event => {
  if (!hisPop.contains(event.target) && event.target !== canidenter) {
    hisPop.style.display = "none";
  }
});
