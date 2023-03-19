const signUpForm = document.getElementById("signup-form");
const signInForm = document.getElementById("signin-form");
const signUpButton = document.getElementById("signup-button");
const signInButton = document.getElementById("signin-button");
const logoutButton = document.getElementById("logout-button");
const headerTextCenter = document.getElementById("header-text-center");
const formValidation = (entries) => {
  let valid = true;
  for (let pair of entries.entries()) {
    if (!Boolean(pair[1])) valid = false;
    //console.log(pair[0] + ": " + pair[1]);
  }
  if (!valid) {
    alert("Preencha todos os campos");
  }
  return valid;
};

const signup = (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  // iterate through entries...
  const isValid = formValidation(formData);

  if (isValid) {
    let users = [];
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    if (savedUsers) {
      users = savedUsers;
    }
    users.push(Object.fromEntries(formData));

    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    window.location = "http://127.0.0.1:5500/html/disciplines.html";
    //console.log(Object.fromEntries(formData));
  }
  // ...or output as an object
};

const signin = (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const signIn = Object.fromEntries(formData);

  const users = JSON.parse(localStorage.getItem("users"));

  if (users) {
    const founded = users.find(
      (item) => item.email === signIn.email && item.password === signIn.password
    );
    if (founded) {
      localStorage.setItem("user", JSON.stringify(founded));
      window.location = "http://127.0.0.1:5500/html/disciplines.html";
    } else alert("Usuário não encontrado");
  }
};

const logout = (ev) => {
  ev.preventDefault();
  localStorage.removeItem("user");

  window.location = "http://127.0.0.1:5500/html/login.html";
};

const onLoadAuth = () => {
  signUpForm?.addEventListener("submit", signup, false);
  signInForm?.addEventListener("submit", signin, false);
  logoutButton?.addEventListener("click", logout);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    headerTextCenter.innerHTML = `Bem vindo ${user.name}`;
  }
};

onLoadAuth();
