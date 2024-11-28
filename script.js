// DOM
const swiper = document.querySelector('#swiper');
const likesContainer = document.querySelector('#likes-container');

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

// Track likes and dislikes for each image
const imageStats = {
    'images/outfit1.jpg': { likes: 0, dislikes: 0 },
    'images/outfit2.jpg': { likes: 0, dislikes: 0 },
    'images/outfit3.jpg': { likes: 0, dislikes: 0 },
    'images/outfit4.jpg': { likes: 0, dislikes: 0 },
    'images/outfit5.jpg': { likes: 0, dislikes: 0 },
    'images/outfit6.jpg': { likes: 0, dislikes: 0 },
    'images/outfit7.jpg': { likes: 0, dislikes: 0 },
    'images/outfit8.jpg': { likes: 0, dislikes: 0 },
    'images/outfit9.jpg': { likes: 0, dislikes: 0 },
    'images/outfit10.jpg': { likes: 0, dislikes: 0 },
    'images/outfit11.jpg': { likes: 0, dislikes: 0 },
    'images/outfit12.jpg': { likes: 0, dislikes: 0 },
    'images/outfit13.jpg': { likes: 0, dislikes: 0 },
    'images/outfit14.jpg': { likes: 0, dislikes: 0 },
    'images/outfit15.jpg': { likes: 0, dislikes: 0 },
    'images/outfit16.jpg': { likes: 0, dislikes: 0 },
    'images/outfit17.jpg': { likes: 0, dislikes: 0 },
};

// variables
let cardCount = 0;

// Function to update likes and dislikes display
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
        likesCountElement.innerHTML = `👍 : ${imageStats[url].likes}   👎 : ${imageStats[url].dislikes}`;

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
      imageStats[urls[cardCount % urls.length]].likes++;
      
      // Update likes display
      updateLikesDisplay();
    },
    onDislike: () => {
      // Increment dislikes for the current image
      imageStats[urls[cardCount % urls.length]].dislikes++;
      
      // Update likes display
      updateLikesDisplay();
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
for (let i = 0; i <18; i++) {
  appendNewCard();
}