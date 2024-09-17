const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendPID: pid => {
    ipcRenderer.send("send-pid", pid);
  },
  sendRawCANData: rawData => {
    ipcRenderer.send("send-raw-can-data", rawData);
  },
  sendRowNumber: rowId => {
    ipcRenderer.send("stop-cyclic-request", rowId);
  },
  sendobdstopsignal: data => {
    ipcRenderer.send("stop-Obd2-request", data);
  },
  sendRowNumberEditing: data => {
    ipcRenderer.send("stop-cyclic-request-edit", data);
  },
  setBaudRate: baudRate => {
    ipcRenderer.send("send-baurdRate", baudRate);
  },
  sendRefreshRawCan: () => {
    ipcRenderer.send("stop-all-the-cycle", "stop all Raw Can Data");
  },
  SaveFile: (content, defaultFilename, fileType) =>
    ipcRenderer.invoke("dialog:saveFile", {
      content,
      defaultFilename,
      fileType
    }),

  openFile: () => ipcRenderer.invoke("dialog:openFile"),

  onCANerror: callback => {
    ipcRenderer.on("can-error", (event, data) => callback(data));
  },
  onCANData: callback => {
    ipcRenderer.on("can-data", (event, data) => callback(data));
  }
});
