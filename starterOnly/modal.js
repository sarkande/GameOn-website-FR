
const regFirstName = new RegExp('[a-zA-Z]{2}.*');
const regLastName = new RegExp('[a-zA-Z]{2}.*');
const regEmail = new RegExp('^[^@\s]+@[^@\s]+$');
const regBirth = new RegExp('[1-2]{1}[0-9]{3}-[0-9]{2}-[0-9]{2}');




function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  let closeButton = document.querySelector("span.close");
  console.log(closeButton);
  closeButton.addEventListener("click", function(){
    modalbg.style.display = "none";
  })
}

let checkDataForm = (data)=>{
  if(data.first === null || !regFirstName.test(data.first))
    return false;
  else if(data.last === null || !regLastName.test(data.last))
    return false;
  else if(data.mail === null || !regEmail.test(data.mail))
    return false;
  else if(data.birth === null || !regBirth.test(data.birth))
    return false;
  else if (data.turnamentCounter === null || Number.parseInt(data.turnamentCounter) === NaN)
  {
    console.log(Number.parseInt(data.turnamentCounter));
    return false;
  }
    
  else if (data.turnamentSelection === null)
    return false;
  else if (data.cgu === false)
    return false;
  else
    return true;

}

let validate = (event) =>{
  event.preventDefault();

  let data={
    first: document.querySelector('#first')?.value ?? null ,
    last: document.querySelector('#last')?.value ?? null,
    mail: document.querySelector('#email')?.value ?? null,
    birth: document.querySelector('#birthdate')?.value ?? null,
    turnamentCounter: document.querySelector('#quantity')?.value ?? null,
    turnamentSelection: document.querySelector('input[name="location"]:checked')?.id ?? null,
    cgu: document.querySelector('input#checkbox1')?.checked ?? null,
    newsletter: document.querySelector('input#checkbox2')?.checked ?? null
  }
  
  console.log(data);

  if(checkDataForm(data))
    event.currentTarget.submit();
    else
    console.error("Probleme de validation de donnée");
  console.log("send");
}