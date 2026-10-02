const button = document.querySelector("#click");
const message = document.querySelector("#message");

const getUsers = async()=>{
  try{
  const response = await fetch("/users");
  const data = await response.json();
  console.log(data);
  message.innerHTML = "";

data.users.forEach((user) => {
  const profile = document.createElement("div");
   profile.className = "profile";
   profile.innerHTML+=`
   <div class="userdata">
          <h2>${user.username}</h2>
          <p>${user.email}</p>
          <button class="viewprofile">View Profile</button>
        </div>
   `;
 message.appendChild(profile);
});
} catch(error){
  console.log(error.message);
}
};
button.addEventListener("click",()=>{
  getUsers();
})




































