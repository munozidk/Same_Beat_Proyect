function renderMatches(users) {
  const container = document.getElementById("matchesContainer");

  const staticCard = container.querySelector(".add-card");

  container.innerHTML = "";
  container.appendChild(staticCard);

  users.forEach(user => {
    const card = document.createElement("article");
    card.classList.add("match-card", "user-card");

    card.innerHTML = `
      <img src="${user.image}" alt="${user.username}" class="match-pic">
      <div class="match-info">
        <h3>${user.username}</h3>
        <p>${user.compatibility}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderPost(post) {
  return `
    <article class="feed-post">

      <div class="post-header">
        <div class="author-info">
          <img src="${post.image}" alt="${post.user}" class="comment-profile-pic">
          <span class="author-name">${post.user}</span>
        </div>
      </div>

      <div class="post-content">
        <p>${post.text}</p>
      </div>

      <div class="post-actions">
        <button class="like-btn">
          <i data-lucide="heart"></i>
        </button>
      </div>

    </article>
  `;
}

function renderAllPosts(posts) {
  const container = document.getElementById("feedSection");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += renderPost(post);
  });
}

function renderChats(chats) {
  const container = document.getElementById("chatList");

  container.innerHTML = "";

  chats.forEach(chat => {
    const chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");

    chatItem.innerHTML = `
      <img src="${chat.image}" alt="${chat.name}" class="chat-item__avatar">
      <span class="chat-item__name">${chat.name}</span>
    `;

    container.appendChild(chatItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMatches(users);
  renderAllPosts(posts);
});

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

        handleLike();

    });
}

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

function initApp() {
    renderMatches(MATCHES);
    renderAllPosts(POSTS);
    renderChats(chats);

    lucide.createIcons(); //para qure funcionen los iconos

    handleLike();
    handleSearch(POSTS);
    handleModal();
    handleCreatePost();
}

initApp();