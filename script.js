// background.js

document.addEventListener("DOMContentLoaded", function () {
    var modeButton = document.getElementById('footer-mode');
    var modeState = localStorage.getItem('modeState');
  
    if (modeState === 'active') {
        setDarkModeColors();
        modeButton.classList.add('active');
        document.body.classList.add('dark-mode');
    } else {
        setLightModeColors();
        document.body.classList.add('light-mode');
    }
  
    setColorsOnLoad();
  
    // Handle page navigation via nav links
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        // Wait for the page transition to complete and then set colors
        setTimeout(function () {
          setColorsOnToggle();
        }, 500);
    });
});
  
    window.addEventListener('beforeunload', function () {
      setColorsOnToggle();
    });
});
  
function toggleMode() {
    var scrollPosition = window.scrollY;

    var modeButton = document.getElementById('footer-mode');
    modeButton.classList.toggle('active');
  
    if (modeButton.classList.contains('active')) {
        setDarkModeColors();
    } else {
        setLightModeColors();
    }
  
    document.body.classList.toggle('dark-mode', modeButton.classList.contains('active'));
    document.body.classList.toggle('light-mode', !modeButton.classList.contains('active'));
  
    var modeState = modeButton.classList.contains('active') ? 'active' : '';
    localStorage.setItem('modeState', modeState);
  
    setTimeout(function () {
        window.scrollTo(0, scrollPosition);
    }, 0); 

    setColorsOnToggle();
}
  
function setColorsOnLoad() {
    if (document.body.classList.contains('dark-mode')) {
        setDarkModeColors();
    } else {
        setLightModeColors();
    }
    setColorsOnToggle();
}
  
function setColorsOnToggle() {
    var lightImages = document.querySelectorAll('.resume-light');
    var darkImages = document.querySelectorAll('.resume-dark');

    // Toggle visibility based on the mode
    lightImages.forEach(function (img) {
        img.style.display = document.body.classList.contains('dark-mode') ? 'none' : 'inline-block';
    });

    darkImages.forEach(function (img) {
        img.style.display = document.body.classList.contains('dark-mode') ? 'inline-block' : 'none';
    });
}
  
function setLightModeColors() {
    var lightModeColor = getRandomColor(lightModeColors);
  
    document.body.style.backgroundColor = lightModeColor;
    setOverlayContainerBackgroundColor(lightModeColor);
    
    var headerFooterElements = document.querySelectorAll('header, footer');
    headerFooterElements.forEach(function (element) {
        element.style.backgroundColor = lightModeColor;
    });
}

function setDarkModeColors() {
    var darkModeColor = getRandomColor(darkModeColors);
  
    document.body.style.backgroundColor = darkModeColor;
    setOverlayContainerBackgroundColor(darkModeColor);
    
    var headerFooterElements = document.querySelectorAll('header, footer');
    headerFooterElements.forEach(function (element) {
        element.style.backgroundColor = darkModeColor;
    });
}

function setOverlayContainerBackgroundColor(color) {
    // Set the background color for all overlay containers
    document.querySelectorAll('.overlay-container').forEach(function (overlay) {
        overlay.style.backgroundColor = color;
    });
}

  
function getRandomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

var lightModeColors = ['#ccc']
var darkModeColors = ['#333']

/* 
var lightModeColors = ['#bdbdbd', '#b0bec5', '#ff5722', '#ff9800', '#ffc107', '#c6ff00', '#cddc39', '#76ff03', '#69f0ae', '#4caf50', '#64ffda', '#4db6ac', '#80deea', '#03a9f4', '#2962ff', '#304ffe', '#651fff', '#ba68c8', '#f06292', '#ff1744', '#ff5252', '#b0bec5', '#ffa726', '#c6ff00']; 
var darkModeColors = ['#222222', '#37474f', '#3e2723', '#574443', '#253832', '#290a33', '#4f443e', '#3e4f3f', '#103b34', '#38292f', '#2d3012', '#1a303d']; 
*/

// menu.js

window.onload = function() {
    var mainPage = 'default-content';

    var defaultContent = document.getElementById(mainPage);
    if (defaultContent) {
        defaultContent.classList.add('active');
    }

    showContent(mainPage);
}

function showContent(contentId) {
    document.body.style.overflow = ''; // Enable background scrolling

    var allContent = document.querySelectorAll('.main-content');
    allContent.forEach(function (content) {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.add('active');
        fadeIn(selectedContent);

        localStorage.setItem('currentSection', contentId);

        updateActiveMenuItem(contentId);
    }

    if (contentId.startsWith('resume-content')) {
        resetResumeStatus();
    }

    if (contentId.startsWith('projects-content')) {
        resetProjectsContent();
    }

    document.getSelection().removeAllRanges();
}

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';

    var start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        element.style.opacity = Math.min(progress / 250, 1);

        if (progress < 250) {
            requestAnimationFrame(step);
        } else {
            // Ensure that the display property is set to 'block' after the fade-in effect
            element.style.display = 'block';
        }
    }
    requestAnimationFrame(step);
}

function resetResumeStatus() {
    var experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(function (item) {
        item.classList.remove('active');

        var imageContainer = item.querySelector('.image-container');
        if (imageContainer) {
            imageContainer.style.display = 'none';
        }
    });
    var resumeColumn1 = document.querySelector('.resume-column1')
    resumeColumn1.scrollTo(0, 0);
}

function resetProjectsContent() {
    const overlays = document.querySelectorAll('.overlay-container');

    if (overlays) {
        overlays.forEach(function(overlay) {
            overlay.style.display = '';
        });
        overlayActive = false;
    }

    var archiveContent = document.getElementById('archive-content');
    var sideProjectContent = document.getElementById('side-project-content');

    if (archiveContent) {
        archiveContent.style.display = 'block';
        enableGridDisplay('archive');
    }

    if (sideProjectContent) {
        sideProjectContent.style.display = 'none';
    }

    var archiveLink = document.getElementById('archive-link');
    var sideProjectLink = document.getElementById('side-project-link');
    if (archiveLink) {
        archiveLink.classList.add('active');
    }
    if (sideProjectLink) {
        sideProjectLink.classList.remove('active');
    }

    const allCarouselSlides = document.querySelectorAll(".project-carousel .carousel-inner");
    
    allCarouselSlides.forEach(carouselSlide => {
        const items = document.querySelectorAll(".carousel-item");
        if (items.length > 0) {
            const size = items[0].clientWidth;
            let counter = 1;
            
            const currentTransform = carouselSlide.style.transform;
            
            if (currentTransform === 'translateX(0px)' ||
            currentTransform === 'translateX(0%)' || 
            currentTransform === 'translateX(-200%)' || 
            currentTransform === 'translateX(-300%)') {
            carouselSlide.style.transition = 'none';
            carouselSlide.style.transform = 'translateX(-100%)';
        }
        } else {
            console.error("No items found in carouselSlide:", carouselSlide);
        }
    });

    const projectCarousels = document.querySelectorAll('.project-carousel');

    projectCarousels.forEach(carousel => {
        const projectType = carousel.closest('.project-content').id.replace('-content', '');

        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        currentIndex[projectType] = 1;

        const sliderContainer = carousel.querySelector('.show-index-num');
        // console.log("sliderContainer:", sliderContainer);
        const totalSlides = totalItems - 2; 
        sliderContainer.textContent = currentIndex[projectType] + "/" + totalSlides;
    }
)}

function updateActiveMenuItem(contentId) {
    var menuItems = document.querySelectorAll('nav a');
    menuItems.forEach(function (menuItem) {
        menuItem.classList.remove('active');
        var targetContentId = menuItem.getAttribute('onclick').match(/showContent\('(.*)'\)/)[1];
        var targetContent = document.getElementById(targetContentId);
        if (targetContentId === contentId && targetContent && targetContent.style.display === 'block') {
            menuItem.classList.add('active');
        }
    });
}

// default.js

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function handleLinkClick(linkId, linkUrl) {
    if (isMobileDevice()) {
        var userConfirmed = confirm("Do you want to open the link?");
        if (userConfirmed) {
            window.location.href = linkUrl; // Redirect if confirmed
        }
    } else {
        window.open(linkUrl, "_blank");
    }
}

document.getElementById('emailLink').addEventListener('click', function () {
    handleLinkClick('emailLink', 'https://mail.google.com/mail/?view=cm&fs=1&to=meanzoopark@gmail.com&su=Subject%20Here&body=Body%20of%20the%20email%20goes%20here');
});

document.getElementById('instagramLink').addEventListener('click', function () {
    handleLinkClick('instagramLink', 'https://www.instagram.com/meanzoopark/');
});

document.getElementById('linkedinLink').addEventListener('click', function () {
    handleLinkClick('linkedinLink', 'https://www.linkedin.com/in/minju-park-5978b8294/');
});

// resume.js

function getStartPosition() {
    const meanzooparkLink = document.querySelector('a[onclick="showContent(\'default-content\')"]');
    const projectsLink = document.querySelector('a[onclick="showContent(\'projects-content\')"]');
    const resumeColumn1 = document.querySelector('.resume-column1');
    const resumeColumn2 = document.querySelector('.resume-column2');

    if (projectsLink && resumeColumn1 && resumeColumn2) {
        const meanzooparkRect = meanzooparkLink.getBoundingClientRect();
        const projectsRect = projectsLink.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        if (screenWidth >= 768) {
            resumeColumn1.style.left = meanzooparkRect.left + 'px';
            resumeColumn1.style.right = (window.innerWidth - projectsRect.left + 7.5) + 'px';
            resumeColumn2.style.marginLeft = projectsRect.left + 'px';
        } else {
            resumeColumn1.style.left = '0';
            resumeColumn1.style.right = '0';
            resumeColumn2.style.marginLeft = '0';
        }
    }}

function handleResize() {
    getStartPosition();
}

window.addEventListener('load', getStartPosition);

window.addEventListener('resize', handleResize);

document.addEventListener("DOMContentLoaded", function () {
    const experienceItems = document.querySelectorAll('.experience-item');
    let activeItem = null;

    experienceItems.forEach(item => {
        const title = item.querySelector('.title');
        const imageContainer = item.querySelector('.image-container');

        title.addEventListener('click', function () {
            const wasActive = item.classList.contains('active');
        
            experienceItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.image-container').style.transition = 'max-height 0.5s ease-in-out';
                otherItem.querySelector('.image-container').style.maxHeight = '0';
                });
        
            if (!wasActive) {
                hideImage('hovered');

                item.classList.add('active');
                imageContainer.style.display = 'block';
                imageContainer.style.transition = 'max-height 0.5s ease-in-out';
                imageContainer.style.maxHeight = imageContainer.scrollHeight + 'px';

                activeItem = item;
            } else {
                activeItem = null;
            }
        });

        item.addEventListener('mouseover', function(event) {
            if (!isMobileDevice() && !item.classList.contains('active')) {
                handleExperienceHover(event, item);
            }
        });

        item.addEventListener('mouseout', function(event) {
            if (!isMobileDevice() && !item.classList.contains('active')) {
                handleExperienceMouseOut(event, item);
            }
        });
    });

    function isMobileDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    function handleExperienceHover(event, experienceItem) {
        const imageSrc = experienceItem.dataset.image;
        showImage(imageSrc, experienceItem, 'hovered');
    }

    function handleExperienceMouseOut(event, experienceItem) {
        hideImage('hovered');
    }

    function showImage(src, experienceItem, imageType) {
        const existingImage = document.getElementById('experience-image');
        if (existingImage) {
            existingImage.remove();
        }

        const rect = experienceItem.getBoundingClientRect();

        const lightImageSrc = experienceItem.dataset.imageLight;
        const darkImageSrc = experienceItem.dataset.imageDark;
        const genericImageSrc = experienceItem.dataset.image;
    
        let selectedImageSrc;
    
        if (document.body.classList.contains('dark-mode')) {
            selectedImageSrc = darkImageSrc || genericImageSrc;
        } else {
            selectedImageSrc = lightImageSrc || genericImageSrc;
        }

        const image = new Image();
        image.src = selectedImageSrc;
        image.alt = 'Experience Image';
        image.id = 'experience-image';

        image.style.filter = 'grayscale(100%)';
        image.style.width = '100%';
        image.style.height = 'auto';
        image.style.position = 'absolute';

        // image.style.right = `10px`;
        const borderRightCoordinate = rect.right + window.scrollX;
        image.style.right = `${document.body.clientWidth - borderRightCoordinate}px`;

        image.style.top = `${rect.top + window.scrollY}px`;
        image.style.maxWidth = '20%';
        image.style.zIndex = '-1';

        if (imageType === 'hovered') {
            image.classList.add('hovered-image');
        }

        document.body.appendChild(image);
    }

    function hideImage(imageType) {
        const existingImage = document.getElementById('experience-image');
        if (existingImage) {
            // Remove the class added for hovered images
            if (imageType === 'hovered') {
                existingImage.classList.remove('hovered-image');
            }
            existingImage.remove();
        }
    }
});

function updateImageVisibility(isDarkMode) {
    var experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(function (item) {
        var imageContainer = item.querySelector('.image-container');
        if (imageContainer) {
            var lightImage = imageContainer.querySelector('.resume-image[data-image-type="light"]');
            var darkImage = imageContainer.querySelector('.resume-image[data-image-type="dark"]');

            if (isDarkMode) {
                lightImage.style.display = 'none';
                darkImage.style.display = 'block';
            } else {
                lightImage.style.display = 'block';
                darkImage.style.display = 'none';
            }
        }
    });
}

// project.js

let currentIndex = {};
currentIndex['archive-content'] = {};
currentIndex['side-project-content'] = {};

let overlayActive = false;

const allCarouselSlides = document.querySelectorAll(".project-carousel .carousel-inner");

allCarouselSlides.forEach(carouselSlide => {
    const items = document.querySelectorAll(".carousel-item", carouselSlide);
    
    if (items.length > 0) {
        carouselSlide.style.transition = "transform 0.3s ease-in-out";
        carouselSlide.style.transform = 'translateX(-100%)';
    } else {
        console.error("No items found in carouselSlide:", carouselSlide);
    }
});

document.addEventListener('DOMContentLoaded', function () {    
    const projectCarousels = document.querySelectorAll('.project-carousel');

    projectCarousels.forEach(carousel => {
        const projectType = carousel.closest('.project-content').id.replace('-content', '');
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        if (!currentIndex[projectType]) {
            currentIndex[projectType] = 1;  // Initialize index for new project type
        }

        const sliderContainer = carousel.querySelector('.show-index-num');
        const totalSlides = totalItems - 2; 
        sliderContainer.textContent = currentIndex[projectType] + "/" + totalSlides;

        carousel.addEventListener('mousemove', function (event) {
            const mouseX = event.clientX - this.getBoundingClientRect().left;

            if (this.clientWidth * 0.4 < mouseX && mouseX < this.clientWidth * 0.6) {
                showText('◯', this)
                this.classList.add('overlayed');
            } else if (mouseX < this.clientWidth * 0.2) {
                showText('←', this);
            } else if (mouseX > this.clientWidth * 0.8) {
                showText('→', this);
            } else {
                hideText(this);
                this.classList.remove('overlayed');
            }
        });

        carousel.addEventListener('mouseleave', function () {
            hideText(this);
        });

        carousel.addEventListener('click', function (event) {
            if (overlayActive) {
                return;
            }

            const mouseX = event.clientX - this.getBoundingClientRect().left;
            const projectType = this.closest('.project-content').id.replace('-content', '');
            const carouselId = this.id;

            if (mouseX < this.clientWidth * 0.2) {
                showPrev(projectType, carouselId);
                updateIndexInfo(this, projectType, carouselId);
            } else if (mouseX > this.clientWidth * 0.8) {
                showNext(projectType, carouselId);
                updateIndexInfo(this, projectType, carouselId);
            } else if (mouseX > this.clientWidth * 0.4 && mouseX < this.clientWidth * 0.6) {
                showOverlay(projectType, carouselId);
            }
        });
    });
});

function showOverlay(project, carouselId, projectType) {
    document.querySelectorAll('.overlay-container').forEach(function(overlay) {
        overlay.style.display = 'none';
    });

    const overlayId = `overlay-${carouselId}`;
    const overlay = document.getElementById(overlayId);

    if (overlay) {
        overlay.style.display = 'block';
        overlayActive = true;
        document.body.style.overflow = 'hidden'; // Disable background scrolling

        overlay.scrollTop = 0;

        const overlayImage = overlay.querySelector('.overlay-image');
        if (overlayImage) {
            overlayImage.scrollTop = 0;
            overlayImage.scrollLeft = 0;
        }

        const overlayDescription = overlay.querySelector('.overlay-description');
        if (overlayDescription) {
            overlayDescription.scrollTop = 0;
        }

        const closeButton = overlay.querySelector('.close-overlay-btn');
        if (closeButton) {
            closeButton.addEventListener('click', function (event) {
                hideOverlay(carouselId);
                event.stopPropagation(); // Stop event propagation to prevent it from reaching the carousel click event
            });
        }
    }
}

function hideOverlay(carouselId) {
    const overlayId = `overlay-${carouselId}`;
    const overlay = document.getElementById(overlayId);
    
    if (overlay) {
        overlay.style.display = 'none';
        overlayActive = false;
        document.body.style.overflow = ''; // Enable background scrolling
    }
}

function showNext(project, carouselId) {
    const carouselElement = document.getElementById(carouselId); // Use getElementById for speed and clarity

    if (!currentIndex[carouselId]) {
        currentIndex[carouselId] = 1;  // Initialize index for each carousel ID
    }
    
    if (carouselElement) {
        const items = carouselElement.querySelectorAll('.carousel-item');
        const carouselInner = carouselElement.querySelector('.carousel-inner');

        currentIndex[carouselId] = (currentIndex[carouselId] + 1) % items.length;  // Update index
        const newTransformValue = -currentIndex[carouselId] * 100 + '%';

        carouselInner.style.transition = 'transform 0.3s ease-in-out';
        carouselInner.style.transform = 'translateX(' + newTransformValue + ')';

        // Log the updated index for debugging
        console.log(`showNext: carousel ID ${carouselId}, new index ${currentIndex[carouselId]}`);

        carouselInner.addEventListener('transitionend', function () {
            if (currentIndex[carouselId] === items.length - 1) {
                carouselInner.style.transition = 'none';
                currentIndex[carouselId] = 1;
                const resetTransformValue = -currentIndex[carouselId] * 100 + '%';
                carouselInner.style.transform = 'translateX(' + resetTransformValue + ')';
            }
        });
    } else {
        console.error(`showNext: carousel element with ID ${carouselId} not found`);
    }
}

function showPrev(project, carouselId) {
    const carouselElement = document.getElementById(carouselId);

    if (!currentIndex[carouselId]) {
        currentIndex[carouselId] = 1;  // Initialize index for each carousel ID
    }
    
    if (carouselElement) {
        const items = carouselElement.querySelectorAll('.carousel-item');
        const carouselInner = carouselElement.querySelector('.carousel-inner');

        currentIndex[carouselId] = (currentIndex[carouselId] - 1 + items.length) % items.length;  // Update index
        const newTransformValue = -currentIndex[carouselId] * 100 + '%';

        carouselInner.style.transition = 'transform 0.3s ease-in-out';
        carouselInner.style.transform = 'translateX(' + newTransformValue + ')';

        // Log the updated index for debugging
        console.log(`showPrev: carousel ID ${carouselId}, new index ${currentIndex[carouselId]}`);

        carouselInner.addEventListener('transitionend', function () {
            if (currentIndex[carouselId] === 0) {
                carouselInner.style.transition = 'none';
                currentIndex[carouselId] = items.length - 2;
                const resetTransformValue = -currentIndex[carouselId] * 100 + '%';
                carouselInner.style.transform = 'translateX(' + resetTransformValue + ')';
            }
        });
    } else {
        console.error(`showPrev: carousel element with ID ${carouselId} not found`);
    }
}

function updateIndexInfo(carousel, projectType, carouselId) {
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const sliderContainer = carousel.querySelector('.show-index-num');

    console.log("sliderContainer:", sliderContainer);
    console.log("currentIndex[carouselId]:", currentIndex[carouselId]);
    console.log("totalItems:", totalItems);

    // Modifying the index number
    const totalSlides = totalItems - 2; 

    let displayedIndex = currentIndex[carouselId];

    if (displayedIndex === 0) {
        displayedIndex = totalSlides;
    } else if (displayedIndex === totalSlides + 1) {
        displayedIndex = 1;
    }

    sliderContainer.textContent = displayedIndex + "/" + totalSlides;
}

function showText(text, carousel) {
    let textElement = carousel.querySelector('.carousel-text');
    if (!textElement) {
        textElement = document.createElement('div');
        textElement.classList.add('carousel-text');
        carousel.appendChild(textElement);
    }

    textElement.innerHTML = '';

    if (text === '◯') {
        textElement.style.right = 'auto';
        textElement.style.left = 'auto';
    } else if (text === '→') {
        textElement.style.right = '10px';
        textElement.style.left = 'auto';
    } else if (text === '←') {
        textElement.style.left = '10px';
        textElement.style.right = 'auto';
    }

    textElement.appendChild(document.createTextNode(text));
    textElement.style.display = 'block';
}

function hideText(carousel) {
    const textElement = carousel.querySelector('.carousel-text');
    if (textElement) {
        textElement.style.display = 'none';
    }
}

function showProject(project) {
    const archiveContent = document.getElementById('archive-content');
    const sideProjectContent = document.getElementById('side-project-content');

    const archiveLink = document.getElementById('archive-link');
    const sideProjectLink = document.getElementById('side-project-link');

    if (project === 'archive' && archiveContent.style.display === 'block') {
        archiveLink.classList.add('active');
        enableGridDisplay('archive');
    }

    if (project === 'side-project' && sideProjectContent.style.display === 'block') {
        sideProjectLink.classList.add('active');
        enableGridDisplay('side-project');
    }

    if (project === 'archive') {
        if (archiveContent.style.display === 'block') {
            archiveContent.style.display = 'none';
            archiveLink.classList.remove('active');
        } else {
            archiveContent.style.display = 'block';
            sideProjectContent.style.display = 'none';
            archiveLink.classList.add('active');
            sideProjectLink.classList.remove('active');
            enableGridDisplay('archive');
        }
    } else if (project === 'side-project') {
        if (sideProjectContent.style.display === 'block') {
            sideProjectContent.style.display = 'none';
            sideProjectLink.classList.remove('active');
        } else {
            sideProjectContent.style.display = 'block';
            archiveContent.style.display = 'none';
            sideProjectLink.classList.add('active');
            archiveLink.classList.remove('active');
            enableGridDisplay('side-project');
        }
    }
}

function enableGridDisplay(projectType) {
    const projectContent = document.getElementById(`${projectType}-content`);

    if (projectContent) {
        projectContent.style.display = 'grid';
    }
}

// personal.js

function showPersonalContent() {
    var passwordLink = document.getElementById('password');
    var personalContent = document.getElementById('personalContent');

    var password = prompt("Enter the password:");

    // Replace "your_password" with the actual password you want to set
    if (password === "1234") {
        passwordLink.style.display = 'none';  // Hide the password link
        personalContent.style.display = 'block';
    } else {
        alert("Incorrect password. Access denied.");
    }
}
/* calculation for header footer height
window.addEventListener('DOMContentLoaded', () => {
    const updateContentHeights = () => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const footerHeight = document.querySelector('.footer').offsetHeight;
        const mainContents = document.querySelectorAll('.main-content');

        mainContents.forEach(content => {
            content.style.top = headerHeight + 'px';
            content.style.bottom = footerHeight + 'px';
            content.style.height = 'calc(100vh - ' + (headerHeight + footerHeight) + 'px)';
        });
    };

    // Initial update when the page loads
    updateContentHeights();

    // Update content heights when the window is resized
    window.addEventListener('resize', updateContentHeights);
});
*/
