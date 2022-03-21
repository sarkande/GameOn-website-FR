//regex
const regFirstName = new RegExp('^[A-zÀ-ÖØ-öø-ÿ]{2,}$'); 
const regLastName = new RegExp('^[A-zÀ-ÖØ-öø-ÿ]{2,}$');
const regEmail = new RegExp('^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$');
const regBirth = new RegExp('^([1-2]{1}[0-9]{3}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2})$');
const regNumber = new RegExp('^[0-9]+$');

//ajoutez bouton modal fermer
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
  let closeButtonCross = document.querySelector("span.close");
  let closeButtonInput = document.querySelector("input.btn-close");
  
  closeButtonCross.addEventListener("click", function(){
    modalbg.style.display = "none";
  })
  closeButtonInput.addEventListener("click", function(){
    modalbg.style.display = "none";
  })
}
/** 
* * CheckDataForm
*  @param data json which contains the input values of the modal 
*  return a json which contains booleans result of the test of each input
*      and a count to avoid doing a loop later
*/ 
let checkDataForm = (data)=>{
  let arrayErrors ={
    errors:{
      first: false,
      last: false,
      email: false,
      birth: false,
      turnamentCounter: false,
      turnamentSelection: false,
      cgu: false
    },    
    count:0
  };
  

  if(data.first === null || !regFirstName.test(data.first)){
    arrayErrors.errors.first = true;
    arrayErrors.count++;
  }
  if(data.last === null || !regLastName.test(data.last)){
    arrayErrors.errors.last = true;
    arrayErrors.count++;
  }
  if(data.email === null || !regEmail.test(data.email)){
    arrayErrors.errors.email = true;
    arrayErrors.count++;
  }
  if(data.birth === null || !regBirth.test(data.birth) || new Date() < new Date(data.birth)){
    arrayErrors.errors.birth = true;
    arrayErrors.count++;
  }
  if (data.turnamentCounter === null || Number.parseInt(data.turnamentCounter).toString() === 'NaN'|| !regNumber.test(data.turnamentCounter)){
    arrayErrors.errors.turnamentCounter = true;
    arrayErrors.count++;   
  }
  if (data.turnamentSelection === null){
    arrayErrors.errors.turnamentSelection = true;
    arrayErrors.count++;
  }
  if (data.cgu === false){
    arrayErrors.errors.cgu = true;
    arrayErrors.count++;
  }

  return arrayErrors;
}


/*
* displayErrorModal
  @param data json which contains booleans result of the test for each input of the modal
  display or hide errors in html
*/ 
let displayErrorModal = (data) =>{
  for (let key in data.errors) {
    if(data.errors[key])
      document.getElementById(key+"_error").classList.add("visible");
    else
      document.getElementById(key+"_error").classList.remove("visible");
  }
}


/*
* sendRequest
  @param data json which contains the input values of the modal 
  send a GET request to the page (base on the form) and display the result for the user
*/ 
let sendRequest = (data)=>{
  document.querySelector(".bground .content .modal-body form").reset();
  document.querySelector('.bground .content .modal-body form').classList.add("hidden");
  document.querySelector('.modal-body--submit').classList.add("visible")
  document.querySelector('.modal-body--submit__send').classList.add("visible")
}

/* 
* validate
  @param event to avoid the submit of information
  Call when submit button is clicked, we check if any input are empty or undefined
  prevent the shenanigans of the user

  if data is correct we can send the information using a GET request
  else we display each error input to the user
*/ 
let validate = (event) =>{
  event.preventDefault();

  let data={
    first: document.querySelector('#first')?.value ?? null ,
    last: document.querySelector('#last')?.value ?? null,
    email: document.querySelector('#email')?.value ?? null,
    birth: document.querySelector('#birthdate')?.value ?? null,
    turnamentCounter: document.querySelector('#quantity')?.value ?? null,
    turnamentSelection: document.querySelector('input[name="location"]:checked')?.value ?? null,
    cgu: document.querySelector('input#checkbox1')?.checked ?? null,
    newsletter: document.querySelector('input#checkbox2')?.checked ?? null
  }

  let dataChecked = checkDataForm(data);

  if(dataChecked.count===0)
    sendRequest(data);
  else
    displayErrorModal(dataChecked);
  

}