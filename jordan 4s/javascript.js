window.onload = () => {
    // Select elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const container = document.querySelector('.container');
    const mainSectionElement = document.querySelector(".mainSection");
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    // Select the background animation element
    const backgroundAnimationElement = document.querySelector('.background-animation');

    const smallTextElement = document.querySelector(".small-text");
    const bigTextElement = document.querySelector(".big-text");
    const imageWrapperElement = document.querySelector(".image-wrapper img");

    const contentData = [
        {
            text: "Air Jordan 4 <br> Release Date: 01/01/2018",
            title: "Travis Scott",
            image: "images/brown.webp",
            background: "linear-gradient(180deg, rgb(86, 60, 49), rgb(61, 45, 35))",
        },
        {
            text: "Air Jordan 4 <br> Release Date: 01/01/2020",
            title: "Off Whites",
            image: "images/offWhite.webp",
            background: "linear-gradient(180deg, rgb(80, 72, 58), rgb(150, 140, 100))",
        },
        {
            text: "Air Jordan 4 <br> Release Date: 03/01/2017",
            title: "Retro Kaws",
            image: "images/kaws.webp",
            background: "linear-gradient(180deg, rgb(25, 25, 28), rgb(35, 33, 38))",
        },
        {
            text: "Air Jordan 4 <br> Release Date: 03/01/2017",
            title: "Black Kaws",
            image: "images/image-2.webp",
            background: "linear-gradient(180deg, rgb(10, 10, 10), rgb(25, 25, 25))",
        },
    ];

    let currentIndex = 0;
    let canClick = true; // Track whether click is allowed

    const updateContent = (index) => {
        // Create a temporary overlay for the transition effect
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = contentData[index].background; // Set the new background color
        overlay.style.zIndex = 1; // Position above the background animation element
        overlay.style.transition = 'opacity 1.5s ease'; // Smooth fade-out transition
        overlay.style.opacity = 0; // Start invisible
    
        // Add the overlay to the background animation element
        backgroundAnimationElement.appendChild(overlay);
    
        // Trigger the fade-in effect for the overlay
        setTimeout(() => {
            overlay.style.opacity = 1; // Fade to the new color
        }, 0);
    
        // Remove active class for the slide-out animation
        container.classList.remove('active');
    
        // Wait for the overlay to complete its transition
        setTimeout(() => {
            // Update the actual background and remove the overlay
            backgroundAnimationElement.style.transition = 'none'; // Disable transition for immediate update
            backgroundAnimationElement.style.background = contentData[index].background; // Update to the new background
            backgroundAnimationElement.removeChild(overlay); // Clean up the overlay
    
            // Update text and image content dynamically
            smallTextElement.innerHTML = contentData[index].text; // Use innerHTML to keep the <br> tag
            bigTextElement.textContent = contentData[index].title;
            imageWrapperElement.src = contentData[index].image;
            mainSectionElement.style.background = contentData[index].gradient;
    
            // Add active class again to trigger the slide-in animation
            container.classList.add('active');
        }, 1000); // Match the duration of the overlay fade-out
    };

    const animateText = (direction) => {
        // Slide out based on direction
        if (direction === 'left') {
            smallTextElement.classList.add('animate__animated', 'animate__slideOutLeft');
            bigTextElement.classList.add('animate__animated', 'animate__slideOutLeft');
        } else if (direction === 'right') {
            smallTextElement.classList.add('animate__animated', 'animate__slideOutLeft');  // Slide out to the left
            bigTextElement.classList.add('animate__animated', 'animate__slideOutLeft');  // Slide out to the left
        }

        // Wait for the slide-out to complete (adjust time according to animation duration)
        setTimeout(() => {
            // Remove slide-out classes to prepare for slide-in
            smallTextElement.classList.remove('animate__slideOutLeft');
            bigTextElement.classList.remove('animate__slideOutLeft');

            // Slide back in based on direction
            if (direction === 'left') {
                smallTextElement.classList.add('animate__slideInRight');
                bigTextElement.classList.add('animate__slideInRight');
            } else if (direction === 'right') {
                smallTextElement.classList.add('animate__slideInLeft');  // Slide back in from the right
                bigTextElement.classList.add('animate__slideInLeft');  // Slide back in from the right
            }
        }, 1000); // Adjust this duration to match the animation duration
    };

    const triggerMainSectionAnimation = () => {
        // Trigger the corner sinking animation for the background animation div
        backgroundAnimationElement.classList.add('trigger-corner-sink');

        // Optionally, remove the class after the animation is complete to reset it
        setTimeout(() => {
            backgroundAnimationElement.classList.remove('trigger-corner-sink');
        }, 2000); // Adjust the duration to match the animation length
    };

    // Left arrow click event
    leftArrow.addEventListener("click", () => {
        if (canClick) {
            canClick = false; // Disable clicks
            currentIndex = (currentIndex - 1 + contentData.length) % contentData.length;
            animateText('left');
            updateContent(currentIndex);
            triggerMainSectionAnimation();
            
            // Re-enable clicks after 2 seconds
            setTimeout(() => {
                canClick = true;
            }, 2000); // 2000ms = 2 seconds
        }
    });

    // Right arrow click event
    rightArrow.addEventListener("click", () => {
        if (canClick) {
            canClick = false; // Disable clicks
            currentIndex = (currentIndex + 1) % contentData.length;
            animateText('right');
            updateContent(currentIndex);
            triggerMainSectionAnimation();
            
            // Re-enable clicks after 2 seconds
            setTimeout(() => {
                canClick = true;
            }, 2000); // 2000ms = 2 seconds
        }
    });

    // Hamburger menu toggle functionality
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        const img = menuToggle.querySelector('img');
        img.style.transform = img.style.transform === 'rotate(360deg)' ? 'rotate(-95deg)' : 'rotate(360deg)';
        container.classList.toggle('active');
    });

    // Initial content load
    updateContent(currentIndex);
};
