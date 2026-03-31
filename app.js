// DATA TEMPORAL
const MATCHES_FAKE = [
  { id: 1, name: "Vane_Diaz", match: 78, image: "https://via.placeholder.com/100" },
  { id: 2, name: "Tati_87", match: 54, image: "https://via.placeholder.com/100" }
];

const POSTS_FAKE = [
  { id: 1, user: "AlexDrift", content: "I love concerts 🔥", liked: false, avatar: "https://via.placeholder.com/50" },
  { id: 2, user: "Tati_87", content: "Best night ever 😭", liked: false, avatar: "https://via.placeholder.com/50" }
];

// RENDER MATCHES
function renderMatches(matches) {
  const container = document.getElementById("matchesContainer");

  const staticCard = container.querySelector(".add-card");

  container.innerHTML = "";
  container.appendChild(staticCard);

  matches.forEach(user => {
    const card = document.createElement("article");
    card.classList.add("match-card", "user-card");

    card.innerHTML = `
      <img src="${user.image}" class="match-pic">
      <h3>${user.name}</h3>
      <p>${user.match}%</p>
    `;

    container.appendChild(card);
  });
}

// RENDER POST
function renderPost(post) {
  return `
    <article class="post-card">
      <h3>${post.user}</h3>
      <p>${post.content}</p>
    </article>
  `;
}

// RENDER TODOS LOS POSTS
function renderAllPosts(posts) {
  const container = document.getElementById("feedSection");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += renderPost(post);
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderMatches(MATCHES_FAKE);
  renderAllPosts(POSTS_FAKE);
});