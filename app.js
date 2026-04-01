//render matches
function renderMatches(usuarios) {
  const container = document.getElementById("matchesContainer");

  const staticCard = container.querySelector(".add-card");

  container.innerHTML = "";
  container.appendChild(staticCard);

  usuarios.forEach(user => {
    const card = document.createElement("article");
    card.classList.add("match-card", "user-card");

    card.innerHTML = `
      <img src="${user.imagen}" alt="${user.username}" class="match-pic">
      <div class="match-info">
        <h3>${user.username}</h3>
        <p>${user.compatibilidad}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

//render posts
function renderPost(post) {
  return `
    <article class="feed-post">

      <div class="post-header">
        <div class="author-info">
          <img src="${post.imagen}" alt="${post.usuario}" class="comment-profile-pic">
          <span class="author-name">${post.usuario}</span>
        </div>
      </div>

      <div class="post-content">
        <p>${post.texto}</p>
      </div>

    </article>
  `;
}

//render para todos los posts
function renderAllPosts(posts) {
  const container = document.getElementById("feedSection");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += renderPost(post);
  });
}
// init conectandolo con el data
document.addEventListener("DOMContentLoaded", () => {
  renderMatches(usuarios);
  renderAllPosts(posts);
});

