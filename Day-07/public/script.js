const button = document.querySelector("#click");
const message = document.querySelector("#message");

button.addEventListener("click",async()=>{
const respose = await fetch("http://localhost:3000/student");
const data = await respose.json();
message.innerHTML = `
<div class="student-card">
    <h2>${data.name}</h2>
    <p>Course: ${data.course}</p>
    <p>Age: ${data.age}</p>
  </div>
  `;
});









































