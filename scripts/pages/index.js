async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let url = 'data/photographers.json'
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographersFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    // console.log(photographers); ==> returns an array of objects
    displayData(photographers);
};

init();

