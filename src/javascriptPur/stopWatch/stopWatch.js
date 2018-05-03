let timer = document.getElementById("timer");
let start = false;
let interval;
let time = 0;
let ul = document.getElementById('list');

function addRecord() {
  let timerNumber = document.createTextNode(time.toFixed(2));
  var node = document.createElement("li");
  
  node.appendChild(timerNumber);
  ul.appendChild(node);
}


document.getElementById("startStop").addEventListener('click', function() {
  if (!start) {
    start = true;
    interval = setInterval(() => {
      time += 0.01;
      timer.innerHTML = time.toFixed(2);
    }, 10);
  } else {
    addRecord();
    clearInterval(interval);
    start = false;
  }
});

document.getElementById("reset").addEventListener('click', function() {
  clearInterval(interval);
  time = 0;
  timer.innerHTML = '0';
  start = false;
  
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
})

document.getElementById("recordTime").addEventListener('click', function() {
  addRecord();
});

const parser = {
  s: 'startStop',
  r: 'reset',
  t: 'recordTime',
};

document.addEventListener('keydown', function(event){
  if(parser[event.key] !== undefined) {
    document.getElementById(parser[event.key]).click();
  }
});




