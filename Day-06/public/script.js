// ================= REGISTER =================

const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector("#message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    username: username.value,
    email: email.value,
    password: password.value
  };

  try {
    const response = await fetch("/users/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    message.textContent = data.message;

    // Registration ke baad form clear
    form.reset();

  } catch (error) {
    message.textContent = "Something Wrong!";
    console.log(error.message);
  }
});


// ================= GET ALL USERS =================

const users = document.querySelector("#user");
const usersContainer = document.querySelector("#usersContainer");

const getUsers = async () => {
  try {
    const response = await fetch("/users");

    const data = await response.json();

    console.log(data);

    usersContainer.innerHTML = "";

    data.users.forEach((user) => {

      const profile = document.createElement("div");

      profile.className = "profile";

      profile.innerHTML = `
        <div class="userdata">
          <h2>${user.username}</h2>
          <p>${user.email}</p>
          <button class="viewprofile">View Profile</button>
        </div>
      `;

      const button = profile.querySelector(".viewprofile");

      button.addEventListener("click", () => {

        window.location.href = `/profile.html?id=${user._id}`;

      });

      usersContainer.appendChild(profile);

    });

  } catch (error) {
    console.log(error.message);
  }
};



users.addEventListener("click", () => {
  getUsers();
});