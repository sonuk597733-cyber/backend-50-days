
const from = document.querySelector("form");
const username = document.querySelector("#username");
const userage = document.querySelector("#userage");
const usercourse = document.querySelector("#usercourse");
const button = document.querySelector("#submit");
const result = document.querySelector("#result");

from.addEventListener("submit",async(e)=>{
  e.preventDefault();
   const  name = username.value;
   const  age =userage.value;
   const course=usercourse.value;

  const response = await fetch(`http://localhost:3000/students/${name}/${age}/${course}`);
  const data = await response.json();
  result.textContent = data.message
})