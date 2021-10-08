//fonction fetch pour interagir avec l'api
fetch ("http://localhost:3000/api/furniture")
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(jsonListItem) {
        addCards(jsonListItem);
    })
    .catch(function(err) {
        console.log(`Une erreur est survenue` + error.message);
    });

//récupération des informations produits et affichage en HTML
function addCards(jsonListItem) {
    for (jsonItem of jsonListItem) {
        let item = new Item(jsonItem.name, jsonItem.price, jsonItem.description, jsonItem.imageUrl, jsonItem._id, jsonItem.varnish)
        const card = 
            document
                .getElementById("list-item");
                card.innerHTML += `
                    <li class="all-item">
                        <a href="./produit.html?_id=${item._id}">
                            <img src="${item.imageUrl}" alt="${item.name}" class="all-item__image">
                            <div class="all-item__legend">
                                <h1 class="all-item__heading">${item.name}</h1>
                                <p class="all-item__desc">${item.description}</p>
                                <p class="all-item__price">${item.getFormatedPrice()}</p>
                            </div>
                        </a>
                    </li>
                `
    }
}