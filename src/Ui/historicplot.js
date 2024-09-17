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
      document.getElementById("fileContent").textContent = content;
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
  lines.forEach(line => {
    const regex = /^(\S+) Tx\s+(\S+)\s+(\d+)\s+\[8\]\s+(.*)$/;
    const match = line.match(regex);

    if (match) {
      const [_, timestamp, can, canId, data] = match;

      if (!canData[canId]) {
        canData[canId] = {
          timestamps: [],
          data: []
        };
      }
      canData[canId].timestamps.push(timestamp);
      canData[canId].data.push(data);
    }
  });

  return canData;
}
