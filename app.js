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
  //se crea aca pq si se hace en el html no se pueden agregar los comentarios dinámicamente
  const commentsHTML = (post.comments || []).map(c => `
    <div class="comment-item">
      <img src="${c.image}" alt="${c.user}" class="comment-avatar">
      <div class="comment-bubble">
        <span class="comment-username">${c.user}</span>
        <p class="comment-text">${c.text}</p>)
      </div>
    </div>
  `).join("");

  return `
    <article class="post-card">

      <div class="post-header">
        <div class="post-actions">
          <button class="like-btn" data-id="${post.id}" data-likes="${post.likes || 0}">
            <i data-lucide="heart"></i>
            <span class="like-count">${post.likes || 0}</span>
          </button>
          <button class="comment-btn" data-id="${post.id}">
            <i data-lucide="message-circle"></i>
          </button>
          <button class="share-btn" data-id="${post.id}">
            <i data-lucide="repeat"></i>
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

      <div class="comments-section" id="comments-${post.id}" style="display:none;">
        <div class="comments-list" id="comments-list-${post.id}">
          ${commentsHTML}
        </div>
        <div class="comment-input-row">
          <img src="assets/avatar 1.jpg" alt="You" class="comment-avatar">
          <input
            type="text"
            class="comment-input"
            id="comment-input-${post.id}"
            placeholder="Write a comment..."
            maxlenght="200"
          >
          <button class="comment-submit-btn" data-id="${post.id}">
            <i data-lucide="send"></i>
          </button>
        </div>
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
        handleComments();
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

function handleComments(){
  //mostrar o ocultar los comentarios

  document.querySelectorAll(".comment-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const postId = btn.dataset.id;
      const section = document.getElementById(`comments-${postId}`);
      const isOpen = section.style.display === "flex";
      section.style.display = isOpen ? "none" : "flex";
    };
  });

   // Publicar comentario
  document.querySelectorAll(".comment-submit-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const postId = parseInt(btn.dataset.id);
      const input = document.getElementById(`comment-input-${postId}`);
      const text = input.value.trim();

      if (!text) return;

      const post = posts.find(p => p.id === postId);
      if (!post.comments) post.comments = [];

      const newComment = {
        id: post.comments.length + 1,
        user: "You",
        image: "assets/avatar 1.jpg",
        text: text
      };

      post.comments.push(newComment);

      // Agregar el comentario al DOM sin re-renderizar todo
      const list = document.getElementById(`comments-list-${postId}`);
      const div = document.createElement("div");
      div.classList.add("comment-item");
      div.innerHTML = `
        <img src="${newComment.image}" alt="${newComment.user}" class="comment-avatar">
        <div class="comment-bubble">
          <span class="comment-username">${newComment.user}</span>
          <p class="comment-text">${newComment.text}</p>
        </div>
      `;
      list.appendChild(div);

      // Actualizar contador
      btn.closest(".post-card")
        .querySelector(".comment-count").textContent = post.comments.length;

      input.value = "";
    };
  });
}

function openModal(){
    document.getElementById("modalOverlay").style.display = "flex";
}

function closeModal(){
    document.getElementById("modalOverlay").style.display = "none";
}

function handleFab() {
  const fab = document.getElementById('fabContainer');
  const fabBtn = document.getElementById('fabBtn');
  const closeBtn = document.getElementById("modalCloseBtn");

  if (fabBtn) {
    fabBtn.addEventListener('click', () => {
      fab.classList.toggle('open');
      lucide.createIcons();
    });
  }

  const optPost = document.getElementById('fabOptPost');
  if (optPost) {
    optPost.addEventListener('click', () => {
      fab.classList.remove('open');
      openModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  document.addEventListener('click', (e) => {
    if (fab && !fab.contains(e.target)) {
      fab.classList.remove('open');
    }
  });
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
        handleComments();
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
    handleComments();
    handleSearch(posts);
    handleFab();
    handleCreatePost();
    handleBubble();
    handlePlayer(); //aqui se llama la función del reproductor de música
}

initApp();