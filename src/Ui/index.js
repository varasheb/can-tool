const addRequestBtn = document.getElementById("home-navbar-btn2");
const baudRate = document.querySelector("#number-select");
const startBtn = document.getElementById("start-rawdata-btn");

function openPopup() {
  popup.style.visibility = "visible";
}

function closePopup() {
  popup.style.visibility = "hidden";
}

addRequestBtn.addEventListener("click", function () {
  window.electron.sendRefreshRawCan();
  openPopup();
});

baudRate.addEventListener("change", function () {
  console.log(`Baud rate selected: ${baudRate.value}`);
});

startBtn.addEventListener("click", function () {
  console.log(`Setting baud rate to: ${baudRate.value}`);
  window.electron.setBaudRate(baudRate.value);
  closePopup();
});

window.addEventListener("click", function (event) {
  if (event.target === popup) {
    closePopup();
  }
});
