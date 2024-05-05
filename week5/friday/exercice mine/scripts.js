const presentStudents = ["Vlad", "Stan", "Alex", "Haroun", "Tsering", "Fevzi"];
const absentStudent = "Giang";
const teacher = "Tim";

let ul = document.createElement("ul");
ul.innerText = "Today was present : ";
document.body.appendChild(ul);
ul.style.cssText =
  "padding :10px; margin:10px;list-style-type:none;border: 2px #ccc solid; border-radius:7px;text-align:center";
presentStudents.forEach((student) => {
  let li = document.createElement("li");
  li.innerText = student;
  ul.appendChild(li);
});

let absentMsg = document.createElement("p");

absentMsg.textContent = `Absence: ${absentStudent}`;
absentMsg.style.cssText =
  "padding :10px; margin:10px;list-style-type:none;border: 2px #ccc solid; border-radius:7px;text-align:center; background-color:red";
document.body.appendChild(absentMsg);
let teacherMsg = document.createElement("p");
teacherMsg.innerText = `Teacher: ${teacher}`;
document.body.appendChild(teacherMsg);
teacherMsg.style.cssText =
  "padding :10px; margin:10px;list-style-type:none;border: 2px #ccc solid; border-radius:7px;text-align:center";
