const timeBox = document.querySelector(".time");
const alarmBtn = document.querySelector("button");
let selectInput = document.querySelectorAll("select");
let selectBox = document.querySelector(".content");
let ringtone = new Audio("asset/ringtone.mp3");
let alarmState = "noSet";
let alarmTime;
for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = ` <option value="${i}">${i}</option> `;
  selectInput[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = ` <option value="${i}">${i}</option> `;
  selectInput[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
  let date = new Date();
  let hour = date.getHours();
  let mintue = date.getMinutes();
  let second = date.getSeconds();
  hour = hour < 10 ? "0" + hour : hour;
  mintue = mintue < 10 ? "0" + mintue : mintue;
  second = second < 10 ? "0" + second : second;
  timeBox.textContent = `${hour}:${mintue}:${second}`;
  if (alarmTime == `${hour}:${mintue}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

alarmBtn.addEventListener("click", () => {
  alarmTime = `${selectInput[0].value}:${selectInput[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("لطفا تایم مورد نظر خود را انتخاب کنید");
  }

  checkState(alarmState);
});
function checkState(state) {
  if (state == "noSet") {
    selectBox.classList.add("disable");
    alarmBtn.textContent = "Clear Time";
    alarmState = "set";
  }
  if (state == "set") {
    selectBox.classList.remove("disable");
    alarmBtn.textContent = "Set Alarm";
    alarmTime = "";
    ringtone.pause();
    selectInput[0].value = "Hour";
    selectInput[1].value = "Minute";
    alarmState = "noSet";
  }
}
