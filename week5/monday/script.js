let users = [
  {
    username: "Khalid",
    password: "test1234",
    email: "khalid@powercoders.org",
  },
  {
    username: "Shakir",
    password: "1234test",
    email: "shakir@powercoders.org",
  },
  {
    username: "Dominic",
    password: "thisIsAv3333rySafePWD!",
    email: "dominic@powercoders.org",
  },
];

let formLogin = document.querySelector("form");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  let userLogin = document.querySelector("#user").value;
  let userPwd = document.querySelector("#pwd").value;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === userLogin && users[i].password === userPwd) {
      console.log(`Correct! Welcome ${users[i].username}`);
      return;
    }
  }

  console.log("Incorrect email or password.");
});
