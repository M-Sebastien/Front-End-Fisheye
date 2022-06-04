/// Helper function that sets many attributes at once
function setAttributes(el, attrs) {
    for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
    }
}


/* ========== PHOTOGRAPHER.JS ========== */

// Generates photographer's card

function photographerFactory(data) {
    const { name, city, country, tagline, portrait } = data;
    
    function getPhotoCardDOM() {
        const photoHeader = document.querySelector('.photograph-header');
        const contactBtn = document.querySelector('.contact_button');

        const photoBio = document.createElement( 'div' );
        setAttributes(photoBio, {"class": "bio", "tabindex": 0})

        const photoName = document.createElement( 'h1' );
        photoName.textContent = name;

        const photoLocation = document.createElement( 'h2' );
        photoLocation.textContent = `${city}, ${country}`;

        const photoCite = document.createElement( 'cite' );
        photoCite.textContent = tagline;

        const picture = `assets/FishEye_Photos/Sample Photos/Photographers ID Photos/${portrait}`;
        const img = document.createElement( 'img' );
        setAttributes(img, {"src": picture})

        photoHeader.appendChild(photoBio);
        photoBio.appendChild(photoName);
        photoBio.appendChild(photoLocation);
        photoBio.appendChild(photoCite);
        photoHeader.appendChild(img);
        photoHeader.insertBefore(photoBio, contactBtn);

        return(photoHeader)
    }

    return { getPhotoCardDOM }
}


// Generates photographer's media gallery

function galleryFactory(data) {
    const { id, title, image, likes, url } = data;

    function getGalleryDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        const media = document.createElement( image ?'img': 'video' );
        setAttributes(media, {"src": url, "alt": `${title} in full page`, "tabindex": 0});
        media.classList.add('article-media');
        media.id = id;

        const subText = document.createElement( 'div');
        subText.classList.add('subtext');
        
        const picTitle = document.createElement( 'h3' );
        picTitle.textContent = title;

        const totalLikes = document.createElement( 'div' );
        totalLikes.classList.add('likes');
        setAttributes(totalLikes, {"tabindex": 0, "aria-label": `add or remove a like`})
        
        const nbrLikes = document.createElement( 'span' );
        nbrLikes.classList.add('nbrLikes');
        nbrLikes.textContent = likes;
        
        const heart_fas = document.createElement( 'i' );
        heart_fas.classList.add('fas', 'fa-heart');
        
        article.appendChild(link);
        link.appendChild(media);
        article.appendChild(subText);
        subText.appendChild(picTitle);
        subText.appendChild(totalLikes);
        totalLikes.appendChild(nbrLikes);
        totalLikes.appendChild(heart_fas);
        
        return (article);     
    }

    return { getGalleryDOM }
}


/* ========== ASIDE ========== */

//Total likes and price display
function asidePhot(arrayGallery, price) { 
    const photSumn = document.querySelector('.photograph-sumn');
    let totalLikes = 0;
    arrayGallery.forEach(element => {
        totalLikes += parseInt(element.likes);
    });
    
    const asideTotalLikes = document.createElement( 'div' );
    const asideLikes = document.createElement( 'SPAN' );
    asideLikes.classList.add('asideLikes');
    asideLikes.setAttribute("alt", "total likes");
    asideLikes.textContent = totalLikes;

    const asideHeart = document.createElement( 'SPAN' );
    asideHeart.classList.add('aside-heart');
    asideHeart.classList.add('fas', 'fa-heart');
    asideHeart.setAttribute("alt", "heart icon");

    const asidePrice = document.createElement( 'SPAN' );
    asidePrice.textContent = price + " €/jour";
    asidePrice.setAttribute("alt", "Photographer price");

    photSumn.appendChild(asideTotalLikes);
    asideTotalLikes.appendChild(asideLikes);
    asideTotalLikes.appendChild(asideHeart);
    photSumn.appendChild(asidePrice);
}