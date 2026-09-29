const form = document.querySelector("form");
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
   const respose = await fetch("http://localhost:3000/user/auth/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(userData)
   })
  const data = await respose.json();
  message.textContent = data.message;

  }
  catch(error){

    message.textContent = "Something Went Wrong."
    console.log(error);
  }


})
