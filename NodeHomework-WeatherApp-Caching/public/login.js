// Fetch the token
// const loginForm = document.querySelector("#login-form");
// const loginButton = document.querySelector("#login-button");
// loginForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   console.log("Form sumitted");

//   const email = loginForm.elements.email.value;
//   const password = loginForm.elements.password.value;

//   fetch("/login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       localStorage.setItem("token", data.token); // store the token in localStorage
//       window.location.href = "/"; // redirect to the home page
//     })
//     .catch((error) => console.error(error));
// });
