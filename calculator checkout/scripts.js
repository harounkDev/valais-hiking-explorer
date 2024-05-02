var inputCount = 1;

function calculate() {
  var total = 0;
  for (var i = 1; i <= inputCount; i++) {
    var input = document.getElementById("input" + i);
    var num = parseFloat(input.value);
    if (!isNaN(num)) {
      total += num;
    }
  }
  document.getElementById("show").textContent =
    "The sum of all numbers: " + total;

  createNextInput();
}

function createNextInput() {
  var lastInput = document.getElementById("input" + inputCount);
  var lastInputValue = parseFloat(lastInput.value);
  if (!isNaN(lastInputValue) && lastInputValue !== 0) {
    inputCount++;
    var newInput = document.createElement("input");
    newInput.type = "number";
    newInput.id = "input" + inputCount;
    newInput.placeholder = "Enter a number";
    newInput.oninput = calculate;
    document.getElementById("calculator").appendChild(newInput);
  }
}
