// firstNumber = 15;
// secondNumber = 20;
// function greaterNumb() {
//   if (firstNumber > secondNumber) {
//     console.log(
//       `The greater number of ${firstNumber}  and ${secondNumber} is ${firstNumber}`
//     );
//   } else {
//     console.log(
//       `The greater number of ${firstNumber}  and ${secondNumber} is ${secondNumber}`
//     );
//   }
// }
// greaterNumb();

let formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  let firstNumber = document.querySelector("#user").value;
  let secondNumber = document.querySelector("#pwd").value;
  let showResult = document.querySelector(".showResult");
  showResult.style.border = "solid 2px green";
  if (firstNumber > secondNumber) {
    showResult.innerHTML = `The greater number of ${firstNumber}  and ${secondNumber} is ${firstNumber}`;
  } else {
    showResult.innerHTML = `The greater number of ${firstNumber}  and ${secondNumber} is ${secondNumber}`;
  }
});
