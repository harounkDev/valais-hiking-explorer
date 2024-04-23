//version one with replace method

// function replaceLetters() {
//   inputText = document.getElementById("textInput").value;

//   replacedText = inputText.replace(/a/g, "e");

//   document.getElementById("show").value = replacedText;
//   document.getElementById("show").style.border = "green 5px solid";
// }
//version two with loop

function replaceAWithE() {
  inputText = document.getElementById("textInput").value;
  let allPut = "";
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === "a") {
      allPut += "e";
    } else if (inputText[i] === "A") {
      allPut += "E";
    } else {
      allPut += inputText[i];
    }
  }

  document.getElementById("show").value = allPut;
  document.getElementById("show").style.border = "green 5px solid";
}
