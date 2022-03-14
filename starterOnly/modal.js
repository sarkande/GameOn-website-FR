
const regFirstName = new RegExp('[a-zA-Z]{2}.*');
const regLastName = new RegExp('[a-zA-Z]{2}.*');
const regEmail = new RegExp('^[^@\s]+@[^@\s]+$');
const regBirth = new RegExp('[1-2]{1}[0-9]{3}(-|/)[0-9]{2}(-|/)[0-9]{2}');




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

  closeButton.addEventListener("click", function(){
    modalbg.style.display = "none";
  })
}

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
  if(data.birth === null || !regBirth.test(data.birth)){
    arrayErrors.errors.birth = true;
    arrayErrors.count++;
  }
  if (data.turnamentCounter === null || Number.parseInt(data.turnamentCounter).toString() === 'NaN'){
    arrayErrors.errors.turnamentCounter = true;
    arrayErrors.count++;   
  }
  if (data.turnamentSelection === null){
    arrayErrors.errors.turnamentSelection = true;
    arrayErrors.count++;
  }else{
    console.log("wut");
  }
  if (data.cgu === false){
    arrayErrors.errors.cgu = true;
    arrayErrors.count++;
  }
    

  return arrayErrors;
}

let displayErrorModal = (data) =>{
  for (let key in data.errors) {
    if(data.errors[key])
      document.getElementById(key+"_error").classList.add("visible");
    else
      document.getElementById(key+"_error").classList.remove("visible");
  }
}
let sendRequest = (event, data)=>{


  fetch(`index.html?first=${data.first}&last=${data.last}&email=${data.email}&birthdate=${data.birth}&quantity=${data.turnamentCounter}&location=${data.turnamentSelection}&cgu=${data.cgu}&newsletter=${data.newsletter}`)
    .then(function(fetchData){
      document.querySelector('.modal-body--submit__send').classList.add("visible")
    }).catch(function(error){
      document.querySelector('.modal-body--submit__error').classList.add("visible")
      console.error(error);
    }).then(function(){
      document.querySelector('.bground .content .modal-body form').classList.add("hidden");
      document.querySelector('.modal-body--submit').classList.add("visible")
    })

}

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
  console.log(data);
  let dataChecked = checkDataForm(data);

  if(dataChecked.count===0)
    sendRequest(event.currentTarget, data);
  else
    displayErrorModal(dataChecked);
  

}