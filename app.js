const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const commentsEndpoint = 'https://jsonplaceholder.typicode.com/comments';
const cardContainer = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const languageFilter = document.getElementById('languageFilter');
const languages = ["English", "Kannada", "Hindi", "Telugu", "Tamil", "Malayalam"];

// Fetch Data from JSON Placeholder API
async function fetchData() {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    data.forEach(item => {
        displayCard(item);
    });
}

function displayCard(data) {
    const card = document.createElement('div');
    card.className = 'card';

    const posterImage = document.createElement('img');
    posterImage.src = `https://picsum.photos/300/200?random=${data.id}`;
    posterImage.alt = 'Poster image';

    const title = document.createElement('h3');
    title.textContent = `${data.title}`;

    const likes = document.createElement('p');
    let likeCount = Math.floor(Math.random() * 1000) + 1;
    likes.innerHTML = `<span class="like-btn">❤️</span> Likes: <span class="like-count">${likeCount}</span>`;

    const views = document.createElement('p');
    let viewCount = Math.floor(Math.random() * 500) + 1;
    views.className = 'views';
    views.innerHTML = `Views: <span class="view-count">${viewCount}</span> 👁️`;

    const languageText = languages[Math.floor(Math.random() * languages.length)];
    const language = document.createElement('p');
    language.textContent = `Language: ${languageText}`;
    card.setAttribute('data-language', languageText);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => card.remove();

    const commentBtn = document.createElement('button');
    commentBtn.textContent = 'Comments';
    commentBtn.className = 'comment-btn';
    commentBtn.onclick = () => {
        fetchComments(data.id, card);
        toggleCommentInput(card);
    };

    const addCommentSection = document.createElement('div');
    addCommentSection.className = 'add-comment';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';

    const addCommentBtn = document.createElement('button');
    addCommentBtn.textContent = 'Add Comment';
    addCommentBtn.onclick = () => addComment(commentInput.value, card);

    addCommentSection.appendChild(commentInput);
    addCommentSection.appendChild(addCommentBtn);

    viewCount++;
    views.querySelector('.view-count').textContent = viewCount;

    card.appendChild(posterImage);
    card.appendChild(title);
    card.appendChild(likes);
    card.appendChild(views);
    card.appendChild(language);
    card.appendChild(deleteBtn);
    card.appendChild(commentBtn);
    card.appendChild(addCommentSection);

    cardContainer.appendChild(card);
}

async function fetchComments(postId, card) {
    const response = await fetch(`${commentsEndpoint}?postId=${postId}`);
    const comments = await response.json();
    const commentsSection = document.createElement('div');
    commentsSection.className = 'comments';

    comments.forEach(comment => {
        const commentText = document.createElement('p');
        commentText.textContent = `${comment.email}: ${comment.body}`;
        commentsSection.appendChild(commentText);
    });

    card.appendChild(commentsSection);
}

function addComment(commentText, card) {
    if (commentText.trim()) {
        const commentsSection = card.querySelector('.comments') || document.createElement('div');
        commentsSection.className = 'comments';

        const newComment = document.createElement('p');
        newComment.textContent = `You: ${commentText}`;
        commentsSection.appendChild(newComment);

        card.appendChild(commentsSection);
    }
}

function toggleCommentInput(card) {
    const addCommentSection = card.querySelector('.add-comment');
    addCommentSection.style.display = addCommentSection.style.display === 'none' ? 'flex' : 'none';
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

languageFilter.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const language = card.getAttribute('data-language');
        card.style.display = (selectedLanguage === '' || language === selectedLanguage) ? 'block' : 'none';
    });
});

fetchData();
