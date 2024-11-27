//DOM
const swiper = document.querySelector('#swiper');
const likesContainer = document.querySelector('#likes-container');

//constants
const urls = [
    'images/outfit1.jpg',
    'images/outfit2.jpg',
    'images/outfit3.jpg',
    'images/outfit4.jpg',
    'images/outfit5.jpg',
    'images/outfit6.jpg'
];

// Track likes for each image
const likesCount = {
    'images/outfit1.jpg': 0,
    'images/outfit2.jpg': 0,
    'images/outfit3.jpg': 0,
    'images/outfit4.jpg': 0,
    'images/outfit5.jpg': 0,
    'images/outfit6.jpg': 0
};

// variables
let cardCount = 0;

// Function to update likes display
function updateLikesDisplay() {
    // Clear previous likes display
    likesContainer.innerHTML = '';

    // Create likes display for each image
    urls.forEach(url => {
        const likesItem = document.createElement('div');
        likesItem.classList.add('likes-item');

        const img = document.createElement('img');
        img.src = url;

        const likesCountElement = document.createElement('div');
        likesCountElement.classList.add('likes-count');
        likesCountElement.textContent = `Likes: ${likesCount[url]}`;

        likesItem.append(img, likesCountElement);
        likesContainer.appendChild(likesItem);
    });
}

// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % urls.length],
    onDismiss: appendNewCard,
    onLike: () => {
      // Increment likes for the current image
      likesCount[urls[cardCount % urls.length]]++;
      
      // Update likes display
      updateLikesDisplay();
    },
    onDislike: () => {
      console.log('Image disliked');
      // Optional: Track dislikes if needed
    }
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

// Initial likes display
updateLikesDisplay();

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}