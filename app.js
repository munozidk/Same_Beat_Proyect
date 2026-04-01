































































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
            post.text.toLowerCase().includes(value)
        });

        renderAllPosts(filteredPosts);

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

    handleLike();
    handleSearch(POSTS);
    handleModal();
    handleCreatePost();
}

initApp();