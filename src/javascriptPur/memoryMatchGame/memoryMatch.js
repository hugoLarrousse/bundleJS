const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



// console.log(shuffleArray(array));

function reveal(cell){
  cell.style.backgroundColor = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

function revealSuccess(cell1, cell2){
  cell1.style.backgroundColor = "green";
  cell1.completed = true;

  cell2.style.backgroundColor = "green";
  cell2.completed = true;
}

function unreveal(cell1, cell2) {
  cell1.style.backgroundColor = "blue";
  cell1.innerHTML = '';
  cell1.clicked = false;

  cell2.style.backgroundColor = "blue";
  cell2.innerHTML = '';
  cell2.clicked = false;
}

let started = false;
let interval;
let time = 0;

function startTimer() {
  if (started == false) {
      interval = setInterval(function() {
          time++;
          document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
      }, 1000)
      started = true;
  }
}


function setUp() {
  const clickedArray = [];
  const array = [1, 1, 2, 2, 3, 3, 4, 4, 5];
  var grid = document.getElementsByTagName("td");
  var answers = shuffleArray(array);
  console.log('answers :', answers);

  var counterCompleted = 0;

  for (var i = 0; i < grid.length; i++) {
    let cell = grid[i];
    Object.assign(cell, {
      completed: false,
      clicked: false,
      value: answers[i],
    });

    cell.addEventListener("mouseenter", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "orange";
    });

    cell.addEventListener("mouseleave", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "blue";
    });

    cell.addEventListener('click', function () {
      startTimer();
      if(this.clicked === false && this.completed === false) {
        clickedArray.push(this);
        reveal(this);
        if (clickedArray.length === 2 ) {
          if (clickedArray[0].value === clickedArray[1].value) {
            revealSuccess(clickedArray[0], this);
            clickedArray.length = 0;
            counterCompleted += 2;
          } else {
            var border = document.getElementById("gridTable");
            console.log('border.style :', border.style);
            border.style.borderColor = "red";
            setTimeout(function() {
              border.style.borderColor = "black";
              unreveal(clickedArray[0], clickedArray[1]);
              clickedArray.length = 0;
            }, 700);
          }
        } else if (clickedArray.length === 1 && clickedArray[0].value === 5) {
          revealSuccess(clickedArray[0], this);
          clickedArray.length = 0;
          counterCompleted += 1;
        }
        console.log('counterCompleted :', counterCompleted);
        if (counterCompleted === 9) {
          alert("You won in " + time + " seconds!");
          clearInterval(interval);
        }
      }
    });


  }

  document.addEventListener('keydown', function(event){
    if(event.key > 0 && event.key < 10 ){
      grid[event.key - 1].click();
    }
});

document.getElementById("restart").addEventListener('click', function(event){
  location.reload();
});

}
setUp();