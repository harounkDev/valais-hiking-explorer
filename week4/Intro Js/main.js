let birthYear = document.getElementById("birthInput").value;
let futureYear = document.getElementById("futureInput").value;
let showSpace = document.getElementById("show");
let ageBeforeBirthday = futureYear - birthYear;
let ageAfterBirthday = ageBeforeBirthday - 1;

futureYear.oninput = function () {
  showSpace.innerHTML =`${futureYear - birthYear}
  
};
