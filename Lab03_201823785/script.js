class Clock {
  name = "";
  hour = 0;
  minute = 0;
  second = 0;

  constructor(name = "", hour, minute, second) {
    this.name = name;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  getName() {
    return this.name;
  }

  setName(name = "") {
    this.name = name;
  }

  setHour(hour) {
    this.hour = hour;
  }

  setMinute(minute) {
    this.minute = minute;
  }

  setSecond(second) {
    this.second = second;
  }

  getHour() {
    return this.hour;
  }

  getMinute() {
    return this.minute;
  }

  getSecond() {
    return this.second;
  }

  printClock() {
    let clocktext =
      "시계 " +
      "[" +
      this.getName() +
      "] : " +
      this.getHour() +
      "시 " +
      this.getMinute() +
      "분 " +
      this.getSecond() +
      "초";

    return clocktext;
  }
}

let clockdiv = document.getElementById("clockdiv");
let count = 0;
let clocklist = [];
let divinnerlist = [];

function makeClock() {
  let clockname = prompt("시계 이름");
  let clockhour, clockminute, clocksec;

  try {
    clockhour = parseInt(prompt("시간"));
    if (clockhour < 1 || clockhour > 24) throw "1~24사이의 수 입력바람";

    clockminute = parseInt(prompt("분"));
    if (clockminute < 0 || clockminute > 60) throw "1~60사이의 수 입력바람";

    clocksec = parseInt(prompt("초"));
    if (clocksec < 0 || clocksec > 60) throw "1~60사이의 수 입력바람";
  } catch (e) {
    alert(e);
  }
  let clock = new Clock(clockname, clockhour, clockminute, clocksec);
  clocklist[count++] = clock;
  let newdiv = document.createElement("div");
  newdiv.setAttribute("class", "inner");

  newdiv.innerText = clock.printClock();
  clockdiv.appendChild(newdiv);
}

function oneHourPlus() {
  divinnerlist = document.getElementsByClassName("inner");
  for (let i = 0; i < clocklist.length; i++) {
    try {
      if (clocklist[i].getHour() + 1 > 24) throw "불가능";
      clocklist[i].setHour(clocklist[i].getHour() + 1);
      divinnerlist[i].innerText = clocklist[i].printClock();
    } catch (e) {
      alert(e);
    }
  }
}

function oneHourMinus() {
  divinnerlist = document.getElementsByClassName("inner");
  for (let i = 0; i < clocklist.length; i++) {
    try {
      if (clocklist[i].getHour() - 1 < 1) throw "불가능";
      clocklist[i].setHour(clocklist[i].getHour() - 1);
      divinnerlist[i].innerText = clocklist[i].printClock();
    } catch (e) {
      alert(e);
    }
  }
}

function tenMinutePlus() {
  divinnerlist = document.getElementsByClassName("inner");
  for (let i = 0; i < clocklist.length; i++) {
    try {
      if (clocklist[i].getMinute() + 10 > 60) throw "불가능";
      clocklist[i].setMinute(clocklist[i].getMinute() + 10);
      divinnerlist[i].innerText = clocklist[i].printClock();
    } catch (e) {
      alert(e);
    }
  }
}

function tenMinuteMinus() {
  divinnerlist = document.getElementsByClassName("inner");
  for (let i = 0; i < clocklist.length; i++) {
    try {
      if (clocklist[i].getMinute() - 10 < 0) throw "불가능";
      clocklist[i].setMinute(clocklist[i].getMinute() - 10);
      divinnerlist[i].innerText = clocklist[i].printClock();
    } catch (e) {
      alert(e);
    }
  }
}

function tenSecondPlus() {
  divinnerlist = document.getElementsByClassName("inner");
  for (let i = 0; i < clocklist.length; i++) {
    try {
      if (clocklist[i].getSecond() + 10 > 60) throw "불가능";
      clocklist[i].setSecond(clocklist[i].getSecond() + 10);
      divinnerlist[i].innerText = clocklist[i].printClock();
    } catch (e) {
      alert(e);
    }
  }
}

function tenSecondMinus() {
  divinnerlist = document.getElementsByClassName("inner");
  for (let i = 0; i < clocklist.length; i++) {
    try {
      if (clocklist[i].getSecond() - 10 < 0) throw "불가능";
      clocklist[i].setSecond(clocklist[i].getSecond() - 10);
      divinnerlist[i].innerText = clocklist[i].printClock();
    } catch (e) {
      alert(e);
    }
  }
}

let btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function () {
  makeClock();
});

let btn2 = document.getElementById("btn2");
btn2.addEventListener("click", function () {
  oneHourPlus();
});

let btn3 = document.getElementById("btn3");
btn3.addEventListener("click", function () {
  oneHourMinus();
});

let btn4 = document.getElementById("btn4");
btn4.addEventListener("click", function () {
  tenMinutePlus();
});

let btn5 = document.getElementById("btn5");
btn5.addEventListener("click", function () {
  tenMinuteMinus();
});

let btn6 = document.getElementById("btn6");
btn6.addEventListener("click", function () {
  tenSecondPlus();
});

let btn7 = document.getElementById("btn7");
btn7.addEventListener("click", function () {
  tenSecondMinus();
});
