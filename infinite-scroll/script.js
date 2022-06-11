const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let afterRenderCount = 0;

// Unsplash API
const count = 5;
const apiKey= 'SnC06-IUXUtrMPRPMSqN2hMkwG9G_gNl5ZGLlM7umNc';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        afterRenderCount = 30;
    }
}

// helper function to set Attributes onDOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// create Elements for links and photos, add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create<a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href:photo.links.html,
            target: '_blank'
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }catch(error) {
        // catch error here
    }
}

// check to see if scrolling near bottom of the page, load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// onload
getPhotos();