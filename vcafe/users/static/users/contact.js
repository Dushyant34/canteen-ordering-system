const Email = document.getElementById("email");
const form = document.getElementById("form");
const Username = document.getElementById("fname");
const Lastname = document.getElementById("lname");
const subject = document.getElementById("subject");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
});

function validate() {
  console.log("inside validate");
  const Emailval = Email.value.trim();
  const Usernameval = Username.value.trim();
  const Lastnameval = Lastname.value.trim();
  const subjectval = subject.value.trim();

  //  email validate
  if (Emailval === "") {
    seterror(Email, "email cannot be blank");
  } else if (Emailval.length < 3) {
    seterror(Email, "email should be greater than 3");
  } else {
    setsuccess(Email);
  }

  //  usernanme validate
  if (Usernameval === "") {
    seterror(Username, "Username cannot be blank");
  } else if (Usernameval.length < 3) {
    seterror(Username, "Username should be greater than 3");
  } else {
    setsuccess(Username);
  }

  //  lastname validate
  if (Lastnameval === "") {
    seterror(Lastname, "Lastname cannot be blank");
  } else if (Lastnameval.length < 4) {
    seterror(Lastname, "Lastname should be greater than 3");
  } else {
    setsuccess(Lastname);
  }
  // subject validate
  if (subjectval === "") {
    seterror(subject, "subject cannot be blank");
  } else if (subjectval.length < 4) {
    seterror(subject, " subject should be greater than 3");
  } else {
    setsuccess(subject);
  }
  // set error
  function seterror(input, errorMsg) {
    let formcontrol = input.parentElement;
    console.log(formcontrol);
    formcontrol.className = "form-control error";
    let span = formcontrol.querySelector("span");
    span.innerHTML = errorMsg;
  }
  // set success
  function setsuccess(input) {
    let formcontrol = input.parentElement;
    formcontrol.className = "form-control success";
  }
}
