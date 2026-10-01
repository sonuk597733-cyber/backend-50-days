const profileContainer = document.querySelector("#profileContainer");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("USER ID:", id);

const getProfile = async () => {
  try {
    const response = await fetch("/users/" + id);

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("DATA:", data);

    profileContainer.innerHTML = `
      <h2>${data.user.username}</h2>
      <p>${data.user.email}</p>
    `;

  } catch (error) {
    console.log("ERROR:", error);
  }
};

getProfile();