const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submit');
const form = document.querySelector('form');
const result = document.getElementById("result");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const userData ={
    name:name.value,
    email:email.value,
    message:message.value
  }
   fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(respose=> respose.json())
    .then(data=>{
      result.textContent = data.message;
      form.reset();
    })
  })






