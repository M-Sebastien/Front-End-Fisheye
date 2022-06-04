// Helper function that sets many attributes at once
function setAttributes(el, attrs) {
    for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
    }
}


/* ========== INDEX.JS ========== */

// Generates photographers' cards on index.html with json data
function photographersFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/FishEye_Photos/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        setAttributes(article, {"id": id});
        
        const img = document.createElement( 'img' );
        setAttributes(img, {"src": picture, "alt": ``})

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const subText = document.createElement( 'div' );
        setAttributes(subText, {"class": "subtext", "tabindex": 0})
        
        const h3 = document.createElement( 'h3');
        h3.textContent = `${city}, ${country}`;
        
        const citeTagLine = document.createElement( 'cite' );
        citeTagLine.textContent = tagline;
        
        const paraPrice = document.createElement( 'p' );
        paraPrice.textContent = `${price}€/jour`;
        
        const anchor = document.createElement( 'a' );
        setAttributes(anchor, {"href": `photographer.html?id=${id}`, "aria-label": `${name}`});
        
        article.appendChild(anchor);
        anchor.appendChild(img);
        anchor.appendChild(h2);
        article.appendChild(subText);
        subText.appendChild(h3);
        subText.appendChild(citeTagLine);
        subText.appendChild(paraPrice);
        
        return (article);
    }

    return { getUserCardDOM }
}