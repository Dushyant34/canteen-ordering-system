const form = document.getElementById("form");
const Username = document.getElementById("Uname");
const password = document.getElementById("psw");


function validate() {
  var value =true
  console.log("inside validate");
  const Usernameval = Username.value.trim();
  const passwordval = password.value.trim();

  //  usernanme validate
  if (Usernameval === "") {
    value=false
    seterror(Username, "Username cannot be blank");
  } else if (Usernameval.length < 3) {
    value=false
    seterror(Username, "Username should be greater than 3");
  } else {
    setsuccess(Username);
  }

  //  lastname validate
  if (passwordval === "") {
    value=false
    seterror(password, "password cannot be blank");
  } else if (passwordval.length < 4) {
    value=false
    seterror(password, "password should be greater than 3");
  } else {
    setsuccess(password);
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
  console.log(value);
  return value   
}
