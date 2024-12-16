// DOM
const swiper = document.querySelector('#swiper');
const likesContainer = document.querySelector('#likes-container');
const commentsList = document.querySelector('.comments-list');
const commentInput = document.querySelector('.comment-input textarea');
const postCommentButton = document.querySelector('.post-comment');
const commentCount = document.querySelector('.comment-count');

// constants
const urls = [
    'images/outfit1.jpg',
    'images/outfit2.jpg',
    'images/outfit3.jpg',
    'images/outfit4.jpg',
    'images/outfit5.jpg',
    'images/outfit6.jpg',
    'images/outfit7.jpg',
    'images/outfit8.jpg',
    'images/outfit9.jpg',
    'images/outfit10.jpg',
    'images/outfit11.jpg',
    'images/outfit12.jpg',
    'images/outfit13.jpg',
    'images/outfit14.jpg',
    'images/outfit15.jpg',
    'images/outfit16.jpg',
    'images/outfit17.jpg'
];

// Track likes, dislikes and comments for each image
const imageStats = {};
urls.forEach(url => {
    imageStats[url] = { 
        likes: 0, 
        dislikes: 0,
        comments: []
    };
});

// variables
let cardCount = 0;
let currentImage = urls[0];

// Function to update likes and dislikes display
function updateLikesDisplay() {
    likesContainer.innerHTML = '';
    urls.forEach(url => {
        const likesItem = document.createElement('div');
        likesItem.classList.add('likes-item');

        const img = document.createElement('img');
        img.src = url;

        const likesCountElement = document.createElement('div');
        likesCountElement.classList.add('likes-count');
        likesCountElement.innerHTML = `👍 : ${imageStats[url].likes}   👎 : ${imageStats[url].dislikes}`;

        likesItem.append(img, likesCountElement);
        likesContainer.appendChild(likesItem);
    });
}

// Function to update comments display
function updateCommentsDisplay() {
    const comments = imageStats[currentImage].comments;
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-content">
                <p>${comment}</p>
                <span class="comment-time">Just now</span>
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
    commentCount.textContent = `${comments.length} comment${comments.length !== 1 ? 's' : ''}`;
}

// Handle comment posting
postCommentButton.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (comment) {
        imageStats[currentImage].comments.push(comment);
        commentInput.value = '';
        updateCommentsDisplay();
    }
});

// functions
function appendNewCard() {
    currentImage = urls[cardCount % urls.length];
    const card = new Card({
        imageUrl: currentImage,
        onDismiss: appendNewCard,
        onLike: () => {
            imageStats[currentImage].likes++;
            updateLikesDisplay();
        },
        onDislike: () => {
            imageStats[currentImage].dislikes++;
            updateLikesDisplay();
        }
    });
    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    
    updateCommentsDisplay();
}

// Initial display
updateLikesDisplay();
updateCommentsDisplay();

// Initialize cards
for (let i = 0; i < 5; i++) {
    appendNewCard();
}