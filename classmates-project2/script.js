let persons;

fetch("persons.json")
  .then((response) => response.json())
  .then((data) => {
    persons = data;

    const maleList = persons.filter((person) => person.gender === "Male");
    const femaleList = persons.filter((person) => person.gender === "Female");
    const otherList = persons.filter(
      (person) => person.gender !== "Male" && person.gender !== "Female"
    );

    buildPage(persons);

    document
      .getElementById("maleButton")
      .addEventListener("click", () => buildPage(maleList));
    document
      .getElementById("femaleButton")
      .addEventListener("click", () => buildPage(femaleList));
    document
      .getElementById("otherButton")
      .addEventListener("click", () => buildPage(otherList));
    document
      .getElementById("allButton")
      .addEventListener("click", () => buildPage(persons));
  });

function buildPage(personsParam) {
  document.querySelector("main").innerHTML = "";

  for (i = 0; i < personsParam.length; i++) {
    let main = document.querySelector("main");
    let article = document.createElement("article");
    main.appendChild(article);

    let image = document.createElement("img");
    image.className = "image";
    image.setAttribute("src", personsParam[i].img);

    let nameText = document.createElement("h3");
    nameText.textContent = `Name: ${personsParam[i].name}`;

    let countryText = document.createElement("p");
    countryText.className = "country";
    countryText.textContent = `Country: ${personsParam[i].country}`;

    let ageNumber = document.createElement("p");
    ageNumber.className = "Age";
    ageNumber.textContent = `Age: ${personsParam[i].age}`;

    let genderText = document.createElement("p");
    genderText.className = "Gender";
    genderText.textContent = `Gender: ${personsParam[i].gender}`;

    let itText = document.createElement("p");
    itText.className = "IT";
    itText.textContent = `Favorite IT path: ${personsParam[i].it}`;

    article.append(image, nameText, countryText, ageNumber, genderText, itText);
    image.style.cssText = "width: 300px;";
  }
}
let footer = document.createElement("footer");
footer.textContent = "CopyRight 2024 made by Giang Pham & Haroun Khenfri";
footer.style.cssText =
  "background-color: #a5a923c4; text-align:center ; color: white; padding:10px";
document.body.append(footer);
