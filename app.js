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
      <div class="match-info match-info-glass">
        <h3>${user.username}</h3>
        <p>${user.compatibility}</p>
      </div>
    `;

    container.appendChild(card);
  });
}



function renderPost(post) {
  return `
    <article class="post-card">

      <div class="post-header">
        <div class="post-actions">
          <button class="like-btn" data-id="${post.id}" data-likes="${post.likes || 0}">
            <i data-lucide="heart"></i>
            <span class="like-count">${post.likes || 0}</span>
          </button>
          <button class="comment-btn">
            <i data-lucide="message-circle"></i>
          </button>
          <button class="share-btn" data-id="${post.id}">
            <i data-lucide="repeat-2"></i>
            <span class="share-count">${post.reposts || 0}</span>
          </button>
        </div>
        <div class="author-info">
          <span class="author-name">${post.user}</span>
          <img src="${post.image}" alt="${post.user}" class="comment-profile-pic">
        </div>
      </div>

      <div class="post-content">
        <p>${post.text}</p>
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

function handleLike (){

    const likeBtns = document.querySelectorAll(".like-btn");

    likeBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();

      const postId = parseInt(btn.dataset.id);
      const post = posts.find(p => p.id === postId);
      const isLiked = btn.classList.contains("active");

      if (isLiked) {
        post.likes = (post.likes || 1) - 1;
        btn.classList.remove("active");
      } else {
        post.likes = (post.likes || 0) + 1;
        btn.classList.add("active");
      }

      btn.querySelector(".like-count").textContent = post.likes;
    };
  });
}

function handleSearch(posts) {
    const input = document.getElementById("searchInput");

    input.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        const filteredPosts = posts.filter(post =>
            post.text.toLowerCase().includes(value)
        );

        renderAllPosts(filteredPosts);

        lucide.createIcons();
        handleRepost();
        handleLike(); // Reattach like event listeners after rendering new posts (Esto es para reactivar los eventos)


    });
}

function handleRepost(){
  const shareBtns = document.querySelectorAll(".share-btn");

  shareBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();

      const postId = parseInt(btn.dataset.id);
      const post = posts.find(p => p.id === postId);
      const isReposted = btn.classList.contains("active");

      if (isReposted) {
        post.reposts = (post.reposts || 1) -1;
        btn.classList.remove("active");
      } else {
        post.reposts = (post.reposts || 0) + 1;
        btn.classList.add("active");
      }

      btn.querySelector(".share-count").textContent = post.reposts;
    };
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
            id: posts.length + 1,
            user: "You",
            text: text,
            image: "assets/avatar.png"
        };

        posts.unshift(newPost);

        renderAllPosts(posts);

        lucide.createIcons();
        handleRepost();
        handleLike();  

        textarea.value = "";
        closeModal();
    })
}

function handleBubble() {
    document.querySelectorAll(".sidebar__nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".sidebar__nav-btn")
                .forEach(b => b.classList.remove("sidebar__nav-btn--active"));
            btn.classList.add("sidebar__nav-btn--active");
        });
    });
}

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn")
            .forEach(b => b.classList.remove("active-btn"));
        btn.classList.add("active-btn");
    });
});

//reproductor de musica
function handlePlayer() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");

  playBtn.addEventListener("click", () => {
    const icon = playBtn.querySelector("svg"); 

    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = `<i data-lucide="pause"></i>`;
    } else {
      audio.pause();
      playBtn.innerHTML = `<i data-lucide="play"></i>`;
    }

    lucide.createIcons(); 
  });
}

function initApp() {
    renderMatches(users);
    renderAllPosts(posts);
    renderChats(chats);

    lucide.createIcons(); //para que funcionen los iconos

    handleLike();
    handleRepost();
    handleSearch(posts);
    handleModal();
    handleCreatePost();
    handleBubble();
    handlePlayer(); //aqui se llama la función del reproductor de música
}

initApp();