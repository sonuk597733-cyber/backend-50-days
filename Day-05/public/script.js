const registerForm = document.querySelector("#registerForm");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.querySelector("#submit");
const registerMessage = document.querySelector("#registerMessage");
const view = 
registerForm.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const userData = {
    username:username.value,
    email:email.value,
    password:password.value
  };
try{
const response = await fetch("http://localhost:3000/user/api/register",{
 method:"POST",
 headers:{
  "Content-Type":"application/json"
 },
 body:JSON.stringify(userData)
})
const data = await response.json();
registerMessage.textContent = data.message;
}
catch(error){
  registerMessage.textContent =error.message;
  console.log(error);
}
});




