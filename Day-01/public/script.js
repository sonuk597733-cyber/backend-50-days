const form = document.querySelector("form");
const button = document.querySelector("button");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector("#message");

form.addEventListener("submit",async(e)=>{
  e.preventDefault();
 const userData = {
  username:username.value,
  email:email.value,
  password:password.value
 }
 try{

const response = await fetch("http://localhost:3000/user/auth/register",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(userData)
});
const data = await response.json()
message.textContent = data.message;
}catch(error){
  message.textContent = "somethinng went wrong";
  console.log(error);
}
})


