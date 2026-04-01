
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

      <div class="post-actions">
        <button class="like-btn">
          <i data-lucide="heart"></i>
        </button>
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

//like function 

function handleLike (){
    const likeBtn = document.querySelectorAll(".like-btn");

    likeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const icon = btn.querySelector("i");

            icon.classList.toggle("lucide-heart");
            icon.classList.toggle("liked");

            btn.classList.toggle("active");
        });
    });
}

//Search function

function handleSearch(posts) {
    const input = document.getElementById("searchInput");

    input.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        const filteredPosts = posts.filter(post => {
            post.texto.toLowerCase().includes(value)
        });

        renderAllPosts(filteredPosts);

        lucide.createIcons();

        handleLike(); // Reattach like event listeners after rendering new posts (Esto es para reactivar los eventos)
    });
}

//Modal function

function openModal(){
    document.getElementById("modalOverlay").style.display = "flex";
}

function closeModal(){
    document.getElementById("modalOverlay").style.display = "none";
}

function handleModal(){
    const fabBtn =  document.getElementById("fabBtn");
    const sidebarBtn = document.getElementById("sidebarCreateBtn");
    const closeBtn = document.getElementById("modalCloseBtn");

    if (fabBtn) fabBtn.addEventListener("click", openModal);
    if (sidebarBtn) sidebarBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
}

// Create posts function

function handleCreatePost(){
    const submitBtn = document.getElementById("modalSubmitBtn");
    const textarea = document.getElementById("postTextarea");

    submitBtn.addEventListener("click", () => {
        const text = textarea.value.trim();

        if (!text) return;

        const newPost = {
            user: "You",
            text: text
        };

        POSTS.unshift(newPost);

        renderAllPosts(POSTS);

        textarea.value = "";
        closeModal();

        handleLike();  
    })
}

//INIT Final

function initApp() {
    renderMatches(MATCHES);
    renderAllPosts(POSTS);

    lucide.createIcons(); //para qure funcionen los iconos

    handleLike();
    handleSearch(POSTS);
    handleModal();
    handleCreatePost();
}

initApp();

