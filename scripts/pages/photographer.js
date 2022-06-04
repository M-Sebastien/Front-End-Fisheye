async function getPhotographers() {
    let url = 'data/photographers.json'
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Display photographer's info
function displayPhotographer(photographer) {
    const photographerDOM = photographerFactory(photographer);
    photographerDOM.getPhotoCardDOM();
};

// Display media gallery
function displayGallery(arrayGallery) { 
    const photGallery = document.querySelector(".media-gallery");

    arrayGallery.forEach(media => {
        const mediaModel = galleryFactory(media);
        const mediaDOM = mediaModel.getGalleryDOM();
        photGallery.appendChild(mediaDOM);
    });
    openLightbox(arrayGallery);
}

async function init() {
    // Collects photographer's data
    const { photographers, media } = await getPhotographers();
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get("id");

    const photographer = photographers.find(key => key.id == photographerId)
    //console.log(photographer); ==> return the photographer's object according to ID
    let arrayGallery = media.filter(key => key.photographerId == photographerId)
    //console.log(arrayGallery); ==> return the photographer's media as an object
    
    arrayGallery = arrayGallery.map(media =>{
        media.url = `assets/FishEye_Photos/Sample Photos/${photographer.name}/${media.image||media.video}`;
        return media;
    })
    
    displayPhotographer(photographer);
    asidePhot(arrayGallery, photographer.price)
    sort(arrayGallery);
    sortPopular(arrayGallery);

    // Lightbox EventListener click and kewdown
    const nextModal = document.querySelector('.lightbox__next');
    const prevModal = document.querySelector('.lightbox__prev');
    const closeModal = document.querySelector('.lightbox__close');
    
    nextModal.addEventListener('click', nextMedia.bind(arrayGallery));
    prevModal.addEventListener('click', prevMedia.bind(arrayGallery));
    closeModal.addEventListener('click', closeMedia);

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown (e) { 
        if (e.code == "ArrowRight") { 
            nextMedia.bind(arrayGallery)() }
        if (e.code == "ArrowLeft") {
            prevMedia.bind(arrayGallery)() }
        if (e.code == "Escape") { 
            closeMedia() }
    }

};

init();


/* ========== LIKES DISPLAY ========== */

function Likes(arrayGallery) {
    const likes = document.querySelectorAll(".likes");

    likes.forEach(element => {element.addEventListener('click', e => {
            let nbrLikes = element.querySelector(".nbrLikes");
            let asideLikes = document.querySelector('.asideLikes');
            const mediaID = e.target.closest("article").querySelector(".article-media").getAttribute("id");
            const mediaLikes = arrayGallery.find(element => element.id == mediaID);
            
            if (mediaLikes.like == "liked") {
                nbrLikes.textContent--;
                mediaLikes.likes--;
                mediaLikes.like = "";
                asideLikes.textContent--;
            }
            else {
                nbrLikes.textContent++;
                asideLikes.textContent++;
                mediaLikes.likes++;
                mediaLikes.like = "liked";
            }

            
        });
    });

    likes.forEach(element => {element.addEventListener('keydown', e => {
        if (e.code == "Enter" || e.code == "Space") {
            
            let nbrLikes = element.querySelector(".nbrLikes");
            let asideLikes = document.querySelector('.asideLikes');
            const mediaID = e.target.closest("article").querySelector(".article-media").getAttribute("id");
            const mediaLikes = arrayGallery.find(element => element.id == mediaID);
            
            if (mediaLikes.like == "liked") {
                nbrLikes.textContent--;
                mediaLikes.likes--;
                mediaLikes.like = "";
                asideLikes.textContent--;
                e.preventDefault();
            }
            else {
                nbrLikes.textContent++;
                asideLikes.textContent++;
                mediaLikes.likes++;
                mediaLikes.like = "liked";
                e.preventDefault();
            }
        }      
        
    });
});

}


/* ========== SORT GALLERY FUNCTION ========== */

function sort(arrayGallery) {
    let getSelect = document.getElementById("select__sort");
    getSelect.addEventListener('change', e => {
        switch (e.target.value) {
            case "popular" :
                sortPopular(arrayGallery);
                break;
            case "title" :
                sortTitle(arrayGallery);
                break;
            case "date" :
                sortDate(arrayGallery);
            default:
        }
    })
};

function sortPopular(arrayGallery) {
    arrayGallery.sort(function(a, b) {
        if (a.likes < b.likes) {
            return 1;
        }
        if (a.likes > b.likes) {
            return -1;
        }
        return 0;
    });
    const photGallery = document.querySelector(".media-gallery");
    photGallery.innerHTML = "";
    displayGallery(arrayGallery);
    Likes(arrayGallery);
    
};

function sortTitle(arrayGallery) {
    arrayGallery.sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
        return 0;
    });
    const photGallery = document.querySelector(".media-gallery");
    photGallery.innerHTML = "";
    displayGallery(arrayGallery);
    Likes(arrayGallery);
    
};

function sortDate(arrayGallery) {
    arrayGallery.sort(function(a,b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    });
    const photGallery = document.querySelector(".media-gallery");
    photGallery.innerHTML = "";
    displayGallery(arrayGallery);
    Likes(arrayGallery);
    
};


/* ========== LIGHTBOX ========== */

// Open Lightbox
function openLightbox(arrayGallery) {

    const mediaVideo = document.querySelector('.media__video');
    const mediaImg = document.querySelector('.media__img');
    const mediaName = document.querySelector('.lightbox__media__name');
    const links = Array.from(document.querySelectorAll('.article-media'));
    const lightboxDOM = document.querySelector('.lightbox');
    const lightboxPrev = document.querySelector('.lightbox__prev');

    lightboxDOM.style.display = "none";

// Open media according to its tag name (img or video)
    function mediaClick (e) {
        e.preventDefault();
        if(this.tagName == 'VIDEO') {
            mediaVideo.setAttribute("src", e.target.getAttribute('src'));
            mediaVideo.id = this.id;
            let i = arrayGallery.findIndex(element => element.id == mediaVideo.id);
            mediaName.textContent = arrayGallery[i].title;
            mediaImg.id = "";
            mediaImg.setAttribute("src", "");
            lightboxDOM.style.display = "block";
            mediaImg.style.display = "none";
            mediaVideo.style.display = "block";
            mediaVideo.focus();
    }

        if(this.tagName =='IMG') {
            mediaImg.setAttribute("src", e.target.getAttribute('src'));
            mediaImg.id = this.id;
            let i = arrayGallery.findIndex(element => element.id == mediaImg.id);
            mediaName.textContent = arrayGallery[i].title;
            mediaVideo.id = "";
            mediaVideo.setAttribute("src", "");
            lightboxDOM.style.display = "block";
            mediaVideo.style.display = "none";
            mediaImg.style.display = "block";
            lightboxPrev.focus();
        }
        
    }

// Listener d'ouverture de lightbox au clique ou clavier
    links.forEach(link => {
        link.addEventListener('click', mediaClick.bind(link));
        link.addEventListener('keydown', e => { if (e.code == "Enter" || e.code == "Space") mediaClick.bind(link)(e) });
    });

};

// Close Lightbox
function closeMedia() {
    const lightboxDOM = document.querySelector('.lightbox');
    lightboxDOM.style.display = "none";
};

// Event listener next
function nextMedia() {

    const mediaVideo = document.querySelector('.media__video');
    const mediaImg = document.querySelector('.media__img');
    const mediaName = document.querySelector('.lightbox__media__name');
    let imgID = mediaImg.id;
    let videoID = mediaVideo.id;
    mediaName.textContent = "";
    
    if (imgID =="") {
        let i = 0;
        i = this.findIndex(element => element.id == videoID);
        if (i == this.length - 1) {
            i = -1;
        }
        if (this[i+1].hasOwnProperty("video")) {
            mediaVideo.setAttribute("src", this[i+1].url);
            mediaVideo.id = this[i+1].id;
            mediaName.textContent = this[i+1].title;
            mediaImg.style.display = "none";
            mediaVideo.style.display = "block";
            mediaVideo.focus();
        }
        if (this[i+1].hasOwnProperty("image")) {
            mediaVideo.id = "";
            mediaVideo.setAttribute("src", "");
            mediaImg.setAttribute("src", this[i+1].url);
            mediaImg.id = this[i+1].id;
            mediaName.textContent = this[i+1].title;
            mediaVideo.style.display = "none";
            mediaImg.style.display = "block";
            const lightboxPrev = document.querySelector('.lightbox__prev');
            lightboxPrev.focus();
        } 
    }

    if (videoID =="") {
        let j = 0;
        j = this.findIndex(element => element.id == imgID);
        if (j == this.length - 1) {
            j = -1;
        }
        if (this[j+1].hasOwnProperty("video")) {
            mediaImg.id = "";
            mediaImg.setAttribute("src", "");
            mediaVideo.setAttribute("src", this[j+1].url);
            mediaVideo.id = this[j+1].id;
            mediaName.textContent = this[j+1].title;
            mediaImg.style.display = "none";
            mediaVideo.style.display = "block";
            mediaVideo.focus();
        }
        if (this[j+1].hasOwnProperty("image")) {
            mediaImg.setAttribute("src", this[j+1].url);
            mediaImg.id = this[j+1].id;
            mediaName.textContent = this[j+1].title;
            mediaVideo.style.display = "none";
            mediaImg.style.display = "block";
            const lightboxPrev = document.querySelector('.lightbox__prev');
            lightboxPrev.focus();
        } 
    }

};
        
// Event listener previous
function prevMedia() {
    
    const mediaVideo = document.querySelector('.media__video');
    const mediaImg = document.querySelector('.media__img');
    const mediaName = document.querySelector('.lightbox__media__name');

    let imgID = mediaImg.id;
    let videoID = mediaVideo.id;
    mediaName.textContent = "";

    if (imgID =="") {
        let i = 0;
        i = this.findIndex(element => element.id == videoID);
        if (i == 0) {
            i = this.length;
        }
        if (this[i-1].hasOwnProperty("video")) {
            mediaVideo.setAttribute("src", this[i-1].url);
            mediaVideo.id = this[i-1].id;
            mediaName.textContent = this[i-1].title;
            mediaImg.style.display = "none";
            mediaVideo.style.display = "block";
            mediaVideo.focus();
        }
        if (this[i-1].hasOwnProperty("image")) {
            mediaVideo.id = "";
            mediaImg.setAttribute("src", this[i-1].url);
            mediaImg.id = this[i-1].id;
            mediaName.textContent = this[i-1].title;
            mediaVideo.style.display = "none";
            mediaImg.style.display = "block";
            const lightboxPrev = document.querySelector('.lightbox__prev');
            lightboxPrev.focus();
        } 
    }

    if (videoID =="") {
        let j = 0;
        j = this.findIndex(element => element.id == imgID);
        if (j == 0) {
            j = this.length;
        }
        if (this[j-1].hasOwnProperty("video")) {
            mediaImg.id = "";
            mediaVideo.setAttribute("src", "");
            mediaImg.setAttribute("src", "");
            mediaVideo.setAttribute("src", this[j-1].url);
            mediaVideo.id = this[j-1].id;
            mediaName.textContent = this[j-1].title;
            mediaImg.style.display = "none";
            mediaVideo.style.display = "block";
            mediaVideo.focus();
        }
        if (this[j-1].hasOwnProperty("image")) {
            mediaImg.setAttribute("src", this[j-1].url);
            mediaImg.id = this[j-1].id;
            mediaName.textContent = this[j-1].title;
            mediaVideo.style.display = "none";
            mediaImg.style.display = "block";
            const lightboxPrev = document.querySelector('.lightbox__prev');
            lightboxPrev.focus();
        } 
    }
}