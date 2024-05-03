let books = [
  {
    name: "Culture",
    author: "John",
    img: "images/bree-anne-3AJoc9iJjo8-unsplash.jpg",
  },
  {
    name: "Adventure",
    author: "David",
    img: "images/madalyn-cox-O7ygzpAL4Mc-unsplash.jpg",
  },
  {
    name: "History",
    author: "Edward",
    img: "images/sincerely-media-CXYPfveiuis-unsplash.jpg",
  },
  {
    name: "Culture",
    author: "John",
    img: "images/tim-alex-1i-P178kxHQ-unsplash.jpg",
  },
  {
    name: "Culture",
    author: "John",
    img: "images/bree-anne-3AJoc9iJjo8-unsplash.jpg",
  },
  {
    name: "Adventure",
    author: "David",
    img: "images/madalyn-cox-O7ygzpAL4Mc-unsplash.jpg",
  },
  {
    name: "History",
    author: "Edward",
    img: "images/sincerely-media-CXYPfveiuis-unsplash.jpg",
  },
  {
    name: "Culture",
    author: "John",
    img: "images/tim-alex-1i-P178kxHQ-unsplash.jpg",
  },
  {
    name: "Culture",
    author: "John",
    img: "images/bree-anne-3AJoc9iJjo8-unsplash.jpg",
  },
  {
    name: "Adventure",
    author: "David",
    img: "images/madalyn-cox-O7ygzpAL4Mc-unsplash.jpg",
  },
  {
    name: "History",
    author: "Edward",
    img: "images/sincerely-media-CXYPfveiuis-unsplash.jpg",
  },
  {
    name: "Culture",
    author: "John",
    img: "images/tim-alex-1i-P178kxHQ-unsplash.jpg",
  },
];

let main = document.querySelector("main");
ul = document.createElement("ul");
ul.style.cssText =
  "display:grid;gap:10px;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));  ";

for (let i = 0; i < books.length; i++) {
  let li = document.createElement("li");
  let h2 = document.createElement("h2");
  h2.textContent = `Book Name: ${books[i].name}`;
  let p = document.createElement("p");
  p.innerText = `Author: ${books[i].author}`;
  let image = document.createElement("img");
  image.src = books[i].img;
  image.style.cssText = "width:300px; height : 300px";
  li.style.cssText =
    "padding :10px; margin:10px;list-style-type:none;border: 2px #ccc solid; border-radius:7px;text-align:center";

  li.appendChild(h2);
  li.appendChild(p);
  li.appendChild(image);

  ul.appendChild(li);
  main.appendChild(ul);
}

const lis = document.querySelectorAll("li");

lis.forEach((li) => {
  li.onclick = function () {
    if (li.style.backgroundColor === "rgb(136, 202, 252)") {
      li.style.backgroundColor = "";
    } else {
      li.style.backgroundColor = "#88cafc";
    }
    li.style.padding = "10px";
    li.style.margin = "10px";
    li.style.listStyleType = "none";
  };
});

lis.forEach((li) => {
  li.onblur = function () {};
});
