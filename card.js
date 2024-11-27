class Card {
  constructor({
    imageUrl,
    onDismiss,
    onLike,
    onDislike
  }) {
    this.imageUrl = imageUrl;
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.#init();
  }

  // private properties
  #startPoint; //initial position where the user starts dragging or swiping
  #offsetX; //horizontal distance
  #offsetY; //vertical distance

  //detects if user's device supports touch interactions(smartphones/tablets)
  #isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const img = document.createElement('img');
    img.src = this.imageUrl;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('card-overlay');
    
    card.append(img, overlay);
    this.element = card;
    this.overlay = overlay;
    
    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }
  }

  #listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('cancel', this.#handleTouchEnd);
  }

  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.#handleMoveUp);

    // prevent card from being dragged
    this.element.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  #handleMove = (x, y) => {
    this.#offsetX = x - this.#startPoint.x;
    this.#offsetY = y - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    
    // Update card transform
    this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
    
    // Show overlay based on drag direction
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.3) {
      if (this.#offsetX > 0) {
        this.overlay.textContent = '👍';
        this.overlay.classList.add('liked');
        this.overlay.classList.remove('disliked');
      } else {
        this.overlay.textContent = '👎';
        this.overlay.classList.add('disliked');
        this.overlay.classList.remove('liked');
      }
      this.overlay.style.opacity = Math.min(Math.abs(this.#offsetX) / (this.element.clientWidth * 0.7), 0.8);
    } else {
      this.overlay.style.opacity = 0;
      this.overlay.classList.remove('liked', 'disliked');
    }
    
    // dismiss card
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  }

  // mouse event handlers
  #handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  }

  #handleMoveUp = () => {
    this.#startPoint = null;
    document.removeEventListener('mousemove', this.#handleMouseMove);
    this.element.style.transform = '';
    this.overlay.style.opacity = 0;
    this.overlay.classList.remove('liked', 'disliked');
  }

  // touch event handlers
  #handleTouchMove = (e) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  }

  #handleTouchEnd = () => {
    this.#startPoint = null;
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transform = '';
    this.overlay.style.opacity = 0;
    this.overlay.classList.remove('liked', 'disliked');
  }

  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveUp);
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('touchend', this.#handleTouchEnd);
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transition = 'transform 1s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      this.onDislike();
    }
  }
}