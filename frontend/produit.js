//accéder aux données de l'api pour retourner un lien vers l'id
const searchParams = new URLSearchParams(location.search);
const newId = new URL (window.location.href).searchParams.get("_id");
const newUrl = `http://localhost:3000/api/furniture/${newId}`;
 
//fonction fetch pour interagir avec l'api
fetch (newUrl)
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(jsonItem) {
        addCard(jsonItem);
    })
    .catch(function(err) {
        console.log(`Une erreur est survenue` + error.message);
    });


//récupération des informations produits et affichage en HTML
function addCard(jsonItem) {
    let item = new Item(jsonItem.name, jsonItem.price, jsonItem.description, jsonItem.imageUrl, jsonItem._id, jsonItem.varnish)
    const card = 
        document
            .getElementById("item");
            card.innerHTML += `
                <div class="item">
                    <img src="${item.imageUrl}" alt="${item.name}" class="item__img">
                    <div class="item-info">
                        <h1 class="item__heading">${item.name}</h1>
                        <p class="item__desc">${item.description}</p>
                        <p class="item__price">${item.getFormatedPrice()}</p>
                        <select name="varnish" id="choice" class="item__choice"></select>
                        <button id="addToBasket" class="item__btn">Ajouter au panier</button>
                    </div>
                </div> `;
                
                addVarnish(jsonItem);

                //ajout du produit au panier
                const buttonAddBasket = document.getElementById("addToBasket")
                buttonAddBasket.addEventListener("click", function() {
                    let newLineBasket = new lineBasket(item.name, item.price, item.description, item.imageUrl, item._id, 1)
                    let recoverBasket = getBasket()
                    let basket = new Basket(recoverBasket)
                    basket.addBasket(newLineBasket)
                });
}


//fonction pour le choix de personnalisation
function addVarnish(jsonItem) {
    const versionChoice = document.getElementById("choice");
    for (let varnish of jsonItem.varnish) {
        versionChoice.innerHTML += `<option value ="${varnish}">${varnish}</option>`;
    }
}