// console.log("neshto");

// const student = {
//   name: "PERO",
// };

// student.name = "Mirko";

// console.log(student.name);

const testFn2 = (b, a = 25) => {
  return a + b;
};

//Zadaca

const uchenik1 = {
  ime: "Marko",
  prezime: "Markovski",
  ocena: 8,
};
const uchenik2 = {
  ime: "Pero",
  prezime: "Perovski",
  ocena: 5,
};

if (uchenik1.ocena > uchenik2.ocena) {
  console.log(
    uchenik1.ime,
    uchenik1.prezime + " e podobar od " + uchenik2.ime,
    uchenik2.prezime
  );
} else if (uchenik1.ocena < uchenik2.ocena) {
  console.log(
    uchenik2.ime,
    uchenik2.prezime + " e podobar od " + uchenik1.ime,
    uchenik1.prezime
  );
} else {
  console.log(
    uchenik1.ime,
    uchenik1.prezime + " ima isto znaenje so " + uchenik2.ime,
    uchenik2.prezime
  );
}
