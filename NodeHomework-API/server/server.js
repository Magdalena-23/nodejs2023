const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
app.use(express.json());

app.use(cors());

app.get("/studenti", (req, res) => {
  fs.readFile("studenti.json", (err, rawData) => {
    if (err) throw err;
    const data = JSON.parse(rawData);
    res.json(data);
  });
});

app.post("/studenti", (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  const nameInput = req.body.ime;
  const averageGradeInput = req.body.prosek;
  if (nameInput === "" || averageGradeInput === "") {
    return;
  }

  fs.readFile("studenti.json", (err, rawData) => {
    if (err) throw err;
    const data = JSON.parse(rawData);
    //   console.log("Initial data:", data);
    data.push({ ime: nameInput, prosek: averageGradeInput });
    //   console.log("Updated data:", data);
    fs.writeFile("studenti.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      res.sendFile(__dirname + "/studenti.json");
    });
  });
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server successfully started");
});
