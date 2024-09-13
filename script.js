document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    const images = [
        'images/image-1.jpg',
        'images/image-2.jpg',
        'images/image-3.jpg',
        'images/image-4.jpg',
        'images/image-5.jpg',
        'images/image-6.jpg',
        'images/image-7.jpg',
        'images/image-8.jpg',
        'images/image-9.jpg',
        'images/image-10.jpg',
        'images/image-11.jpg',
        'images/image-12.jpg'
    ];

    images.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const galleryImage = document.createElement('img');
        galleryImage.src = imageSrc;
        galleryImage.alt = `Image ${index + 1}`;

        galleryItem.appendChild(galleryImage);
        galleryContainer.appendChild(galleryItem);
    });

    const galleryItems = document.querySelectorAll('.gallery-item img');
    const popup = document.querySelector('.popup');
    const popupImg = document.querySelector('.popup-img');
    const closeBtn = document.querySelector('.close');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;
    let isTransitioning = false;

    const createCarousel = () => {
        carousel.innerHTML = '';
        images.forEach((_, index) => {
            const circleContainer = document.createElement('div');
            circleContainer.classList.add('tooltip');

            const circle = document.createElement('div');
            circle.classList.add('circle');

            const tooltipText = document.createElement('span');
            tooltipText.classList.add('tooltiptext');
            tooltipText.textContent = `Image ${index + 1}`;

            circleContainer.appendChild(circle);
            circleContainer.appendChild(tooltipText);

            if (index === currentIndex) {
                circle.classList.add('active');
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            }

            circle.addEventListener('click', () => {
                if (!isTransitioning) {
                    changeImage(index);
                }
            });

            circle.addEventListener('mouseenter', () => {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            });

            circle.addEventListener('mouseleave', () => {
                if (index !== currentIndex) {
                    tooltipText.style.visibility = 'hidden';
                }
            });

            carousel.appendChild(circleContainer);
        });
    };

    const openPopup = (index) => {
        currentIndex = index;
        popup.style.display = 'flex';
        popupImg.style.opacity = '0';
        setTimeout(() => {
            popupImg.src = images[currentIndex];
            popupImg.style.opacity = '1';
            createCarousel();
            updateArrowStates(); 
        }, 50);
    };
    
    const updateArrowStates = () => {
        if (currentIndex === 0) {
            leftArrow.classList.add('disabled');
        } else {
            leftArrow.classList.remove('disabled');
        }
    
        if (currentIndex === images.length - 1) {
            rightArrow.classList.add('disabled');
        } else {
            rightArrow.classList.remove('disabled');
        }
    };

    const closePopup = () => {
        popup.style.display = 'none';
    };

    const changeImage = (index) => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Preload the new image
        const preloadImg = new Image();
        preloadImg.src = images[index];
        
        preloadImg.onload = () => {
            popupImg.classList.add('fade-out'); 
            setTimeout(() => {
                popupImg.classList.add('blur'); 
                
                popupImg.addEventListener('transitionend', function handleTransitionEnd() {
                    popupImg.src = preloadImg.src;
                    popupImg.classList.remove('blur');
                    popupImg.classList.remove('fade-out');
                    popupImg.classList.add('fade-in');
                    
                    popupImg.classList.add('zoom');
                    
                    popupImg.addEventListener('transitionend', function removeZoom() {
                        popupImg.classList.remove('zoom');
                    }, { once: true });
                    
                    popupImg.removeEventListener('transitionend', handleTransitionEnd);
                    isTransitioning = false;
                    currentIndex = index;
                    updateActiveCircle();
                    updateArrowStates(); 
                }, { once: true });
            }, 50); 
        };
    };
    
    
    const nextImage = () => {
        if (!isTransitioning && currentIndex < images.length - 1) {
            const nextIndex = currentIndex + 1;
            changeImage(nextIndex);
        }
    };
    
    const prevImage = () => {
        if (!isTransitioning && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            changeImage(prevIndex);
        }
    };

    const updateActiveCircle = () => {
        document.querySelectorAll('.circle').forEach((circle, index) => {
            const tooltipText = circle.parentNode.querySelector('.tooltiptext');
            if (index === currentIndex) {
                circle.classList.add('active');
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            } else {
                circle.classList.remove('active');
                tooltipText.style.visibility = 'hidden';
            }
        });
    };

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            openPopup(index);
            createCarousel();
        });
    });

    closeBtn.addEventListener('click', closePopup);
    rightArrow.addEventListener('click', nextImage);
    leftArrow.addEventListener('click', prevImage);

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
});
