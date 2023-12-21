//Fetching realTimeElement and other Elements.
const realTimeEl = document.getElementById("real-time");
const hrEl = document.getElementById("hr");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");
const apEl = document.getElementById("ap");
const setAlarmButton = document.getElementById("set-alarm-button");
const hrUpButton = document.getElementById("hr-up");
const hrDownButton = document.getElementById("hr-down");
const minUpButton = document.getElementById("min-up");
const minDownButton = document.getElementById("min-down");
const secUpButton = document.getElementById("sec-up");
const secDownButton = document.getElementById("sec-down");
const amToggleButton = document.getElementById("am-toggle");
const pmToggleButton = document.getElementById("pm-toggle");
const alarmList = document.getElementById("alarm-list");

//Function to show Real Time
function realTimeShow() {
  const timeNow = new Date();
  var realHours = timeNow.getHours();
  const realMinutes = timeNow.getMinutes();
  const realSeconds = timeNow.getSeconds();
  var ampm;
  if (realHours >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  if (realHours > 12) {
    realHours = realHours - 12;
  } else {
    realHours = realHours;
  }
  //Formating to get proper time
  const time = `${realHours < 10 ? "0" + realHours : realHours}:${
    realMinutes < 10 ? "0" + realMinutes : realMinutes
  }:${realSeconds < 10 ? "0" + realSeconds : realSeconds} ${ampm}`;

  //Setting the inner text of realTimeELement as RealTime
  realTimeEl.textContent = time;
}

// Calling the Real Time Show function to show time immediately
realTimeShow();

//Setting the update interval of time as 1 second
//realTimeShow as the callback function
setInterval(realTimeShow, 1000);

//Setting the alarm value
//Addiding Event Listeners to the Hr, Min, Sec and AmPm button of input fields

//Hour Button Set
hrUpButton.addEventListener("click", function () {
  let val = parseInt(hrEl.value);
  if (val < 11) {
    val++;
  }

  let final = `${val < 10 ? "0" + val : val}`;
  //console.log(final);
  hrEl.value = final;
});

hrDownButton.addEventListener("click", function () {
  let val = parseInt(hrEl.value);
  if (val > 0) {
    val--;
  }

  let final = `${val < 10 ? "0" + val : val}`;
  //console.log(final);
  hrEl.value = final;
});

//Minute Button Set
minUpButton.addEventListener("click", function () {
  let val = parseInt(minEl.value);
  if (val < 59) {
    val++;
  }

  let final = `${val < 10 ? "0" + val : val}`;
  //console.log(final);
  minEl.value = final;
});

minDownButton.addEventListener("click", function () {
  let val = parseInt(minEl.value);
  if (val > 0) {
    val--;
  }

  let final = `${val < 10 ? "0" + val : val}`;
  //console.log(final);
  minEl.value = final;
});

//Second Value
secUpButton.addEventListener("click", function () {
  let val = parseInt(secEl.value);
  if (val < 59) {
    val++;
  }

  let final = `${val < 10 ? "0" + val : val}`;
  //console.log(final);
  secEl.value = final;
});

secDownButton.addEventListener("click", function () {
  let val = parseInt(secEl.value);
  if (val > 0) {
    val--;
  }

  let final = `${val < 10 ? "0" + val : val}`;
  //console.log(final);
  secEl.value = final;
});

//AM-PM Toggle
amToggleButton.addEventListener("click", function () {
  apEl.value = "AM";
});

pmToggleButton.addEventListener("click", function () {
  apEl.value = "PM";
});

//Alarm Button Event Listerner
setAlarmButton.addEventListener("click", function () {
  addAlarm();
});

//Function to add new alarm
function addAlarm() {
  const li = document.createElement("li");
  const newAlarm = `${hrEl.value}:${minEl.value}:${secEl.value} ${apEl.value}`;
  //console.log(newAlarm)
  li.innerHTML = `<span>${newAlarm}</span><button class="delete-button"><i class="fa-regular fa-trash-can"></i></button>`;
  alarmList.append(li);
  const deleteAlarmButton = li.querySelector(".delete-button");
  deleteAlarmButton.addEventListener("click", function () {
    const listItem = this.closest("li");
    if (listItem) {
      listItem.remove();
    }
  });

  //Once added starts checking the alarm
  startCheckingAlarms();
}

//Function for checking if the alarm goes off

function startCheckingAlarms() {
  const currentTime = realTimeEl.textContent.trim(); // Get current time from the displayed real-time element

  for (let i = 0; i < alarmList.children.length; i++) {
    const alarmBox = alarmList.children[i];
    const alarmTime = alarmBox.querySelector("span").textContent.trim();
    // console.log("c",currentTime);
    // console.log("a",alarmTime);
    if (alarmTime === currentTime) {
      // Alarm time matches current time
      alarmBox.remove();
      alert(`Alarm! for ${currentTime}`);
      return;
    }
  }

  // Schedule the next check after 1 second
  setTimeout(startCheckingAlarms, 1000);
}
