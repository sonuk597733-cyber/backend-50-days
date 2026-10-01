const usersContainer = document.querySelector("#usersContainer");
const profileContainer = document.querySelector("#profileContainer");

const getUser = async () => {
  try {
    const response = await fetch("/users");
    const data = await response.json();
    const searchName = "sonu kumar";
       data.users
       .filter((user) => user.username.includes(searchName))
    .forEach((user) => {
      const profile = document.createElement("div");

      profile.className = "profile";

      profile.innerHTML = `
        <h2>${user.username}</h2>
        <p>Email: ${user.email}</p>
        <button>View Profile</button>
      `;
     const button = profile.querySelector("button");
      button.addEventListener("click",async()=>{
      const response = await fetch("/users/"+ user._id)
      const data = await response.json();
      const profileContainer = document.querySelector("#profileContainer");
      profileContainer.innerHTML = `
  <div class="profile">
    <h2>${data.user.username}</h2>
    <p>Email: ${data.user.email}</p>
  </div>
`;
 })
      usersContainer.appendChild(profile);
    });
  } catch (error) {
    console.log(error);
  }
};

getUser();