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
   

    // Create gallery dynamically
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

    // Create carousel dots
    const createCarousel = () => {
        carousel.innerHTML = '';
        images.forEach((_, index) => {
            const circleContainer = document.createElement('div');
            circleContainer.classList.add('tooltip');
            
            const circle = document.createElement('div');
            circle.classList.add('circle');
            
            // Tooltip text
            const tooltipText = document.createElement('span');
            tooltipText.classList.add('tooltiptext');
            tooltipText.textContent = `Image ${index + 1}`;
            
            // Append tooltip text to the circle container
            circleContainer.appendChild(circle);
            circleContainer.appendChild(tooltipText);
            
            // Highlight the current image and make its tooltip visible
            if (index === currentIndex) {
                circle.classList.add('active');
                tooltipText.textContent = `Image ${currentIndex + 1}`;  
                tooltipText.style.visibility = 'visible';  
                tooltipText.style.opacity = '1';  
            }
            
            circle.addEventListener('click', () => openPopup(index));

            // Update tooltip on hover
            circle.addEventListener('mouseenter', () => {
                tooltipText.textContent = `Image ${index + 1}`;
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            });

            circle.addEventListener('mouseleave', () => {
                if (index !== currentIndex) {
                    tooltipText.style.visibility = 'hidden';  
                } else {
                    tooltipText.textContent = `Image ${currentIndex + 1}`;
                    tooltipText.style.visibility = 'visible';
                    tooltipText.style.opacity = '1';
                }
            });

            carousel.appendChild(circleContainer);
        });
    };

    // Function to open the popup and display the clicked image
    const openPopup = (index) => {
        currentIndex = index;
        popupImg.src = images[currentIndex];
        popup.style.display = 'flex';
        updateActiveCircle();
    };

    // Function to close the popup
    const closePopup = () => {
        popup.style.display = 'none';
    };

    // Function to go to the next image
    const nextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        popupImg.src = images[currentIndex];
        updateActiveCircle(); 
    };

    // Function to go to the previous image
    const prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        popupImg.src = images[currentIndex];
        updateActiveCircle();
    };

    // Update active circle and tooltip in the carousel
    const updateActiveCircle = () => {
        document.querySelectorAll('.circle').forEach((circle, index) => {
            const tooltipText = circle.parentNode.querySelector('.tooltiptext');
            if (index === currentIndex) {
                circle.classList.add('active');
                tooltipText.textContent = `Image ${currentIndex + 1}`;
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1'; 
            } else {
                circle.classList.remove('active');
                tooltipText.style.visibility = 'hidden';  
            }
        });
    };

    // Event listeners for gallery items
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            openPopup(index);
            createCarousel();
        });
    });

    // Event listener for closing the popup
    closeBtn.addEventListener('click', closePopup);

    // Event listeners for next and previous buttons (arrows)
    rightArrow.addEventListener('click', nextImage);
    leftArrow.addEventListener('click', prevImage);

    // Close the popup when clicking on the backdrop
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
});
