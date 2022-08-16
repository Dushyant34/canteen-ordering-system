const Email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const password = document.getElementById("psw");
const cpassword = document.getElementById("cpsw");
const button = document.getElementById("btn")


function validate() {
  var value =true   
  console.log("inside validate");
  const Emailval = Email.value.trim();
  const cpasswordval = cpassword.value.trim();
  const fullnameval = fullname.value.trim();
  const passwordval = password.value.trim();

  //  email validate
  if (Emailval === "") {
    seterror(Email, "email cannot be blank");
    value=false
  } else if (Emailval.length < 3) {
    seterror(Email, "email should be greater than 3");
    value=false
  } else {
    setsuccess(Email);
  }

  //  fullname validate
  if (fullnameval === "") {
    seterror(fullname, "fullname cannot be blank");
    value=false
  } else if (fullnameval.length < 3) {
    seterror(fullname, "fullname should be greater than 3");
    value=false
  } else {
    setsuccess(fullname);
  }

  //  lastname validate
  if (cpassword === "") {
    seterror(cpassword, " confirm password cannot be blank");
    value=false
  } else if (cpasswordval.length < 4) {
    seterror(cpassword, " confirm password should be greater than 3");
    value=false
  } else {
    setsuccess(cpassword);
  }
  //  lastname validate
  if (passwordval === "") {
    seterror(password, "password cannot be blank");
    value=false
  } else if (passwordval.length < 4) {
    seterror(password, "password should be greater than 3");
    value=false
  } else {
    setsuccess(password);
  }
  // set error
  function seterror(input, errorMsg) {
    let formcontrol = input.parentElement;
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
button.addEventListener("submit",(e)=>{
   e.preventDefault()
})