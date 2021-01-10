let score = 0;
let cycles = 0;

var pomodoro = {
  started : false,
  minutes : 0,
  seconds : 0,
  fillerHeight : 0,
  fillerIncrement : 0,
  interval : null,
  minutesDom : null,
  secondsDom : null,
  fillerDom : null,

  init : function(){
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.fillerDom = document.querySelector('#filler');
    
    this.interval = setInterval(function(){
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector('#work').onclick = function(){
      self.startWork.apply(self);
    };
    document.querySelector('#shortBreak').onclick = function(){
      self.startShortBreak.apply(self);
    };
    document.querySelector('#longBreak').onclick = function(){
      self.startLongBreak.apply(self);
    };
    document.querySelector('#stop').onclick = function(){
      self.stopTimer.apply(self);
    };
  },
  resetVariables : function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200/(this.minutes*60);
    this.fillerHeight = 0;  
  },
  startWork: function() {
    this.resetVariables(25, 0, true);
  },
  startShortBreak : function(){
    this.resetVariables(5, 0, true);
  },
  startLongBreak : function(){
    this.resetVariables(15, 0, true);
  },
  stopTimer : function(){
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom : function(){
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
    this.fillerDom.style.height = this.fillerHeight + 'px';
  },
  intervalCallback : function(){
    if(!this.started) return false;
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete : function(){
    this.started = false;
    this.fillerHeight = 0;
    score += 50;
    cycles += 1;
    document.querySelector('#score').innerHTML = score;
    document.querySelector('#cycles').innerHTML = cycles;
    console.log(cycles)
  }
};
window.onload = function(){
pomodoro.init();
};

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}