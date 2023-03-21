const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("calculator.ejs");
});

app.post("/", (req, res) => {
  const firstNumber = Number(req.body.firstNumber);
  const secondNumber = Number(req.body.secondNumber);
  const operation = req.body.operation;
  let result;

  switch (operation) {
    case "add":
      result = firstNumber + secondNumber;
      break;
    case "subtract":
      result = firstNumber - secondNumber;
      break;
    case "multiply":
      result = firstNumber * secondNumber;
      break;
    case "divide":
      result = firstNumber / secondNumber;
      break;
  }
  res.render("result", { result });
});

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server successfully started...");
});
