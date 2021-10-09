let listBasket = getBasket();
showBasket(listBasket)

//Afficher les produits et leur prix dans le panier et pouvoir interagir avec
function showBasket (listBasket){
    const clearBasket = document.getElementById("clearBasket")
    const info = document.getElementById("info")
    const addLine = document.getElementById("addLine");
    if (listBasket == 0){
        clearBasket.style.visibility = 'hidden';
        addLine.innerHTML += 
        `<tr>
            <td>Le panier est vide</td>
        </tr>
            `
        info.style.visibility = 'hidden';
    };

    let basket = new Basket(listBasket);
    for (let lineArticle of listBasket){
        let lignedelarticle = new lineBasket(lineArticle.name, lineArticle.price, lineArticle.description, lineArticle.imageUrl, lineArticle._id, lineArticle.quantity)
        const addLine = 
                document
                    .getElementById("addLine");
                    addLine.innerHTML +=`
                        <tr>
                            <td class="table__case">${lignedelarticle.name}</td>
                            <td class="table__case">${lignedelarticle.getFormatedPrice()}</td>
                            <td class="table__case--modif">
                                <div>
                                    <input type="button" onclick="document.location.reload(false)"  value="-" class="remove" data-id="${lignedelarticle._id}">
                                    <label for="quantity"><input name="quantity" class="quantity-fields" type="number" disabled value="${lignedelarticle.quantity}"></label>
                                    <input type="button" onclick="document.location.reload(false)" value="+" class="add" data-id="${lignedelarticle._id}">
                                </div>
                            </td>
                            <td class="table__case">${lignedelarticle.getFormatedTotalLinePrice()}</td>
                            <td class="table__case"> 
                                <button class="deleteLine-btn" onclick="document.location.reload(false)" data-id="${lignedelarticle._id}"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    `

                    document.querySelectorAll('.add').forEach(add => {
                        add.addEventListener("click", function(){
                            let recoverBasket = getBasket()
                            let basket = new Basket(recoverBasket)
                            basket.addQuantity(this.dataset.id)
                        })
                    });

                   document.querySelectorAll('.remove').forEach(remove => {
                        remove.addEventListener("click", function(){
                            let recoverBasket = getBasket()
                            let basket = new Basket(recoverBasket)
                            basket.removeQuantity(this.dataset.id)
                        })
                    });

                    document.querySelectorAll('.deleteLine-btn').forEach(deleteLine => {
                        deleteLine.addEventListener("click", function(){
                            let recoverBasket = getBasket()
                            let basket = new Basket(recoverBasket)
                            basket.deleteLineArticle(this.dataset.id)
                        })
                    });
    }

    document
        .getElementById('showTotalPrice')
        .innerHTML = `
            <tr class="table__line bold">
                <td class="table__case" colspan="3">Total du panier</td>
                <td class="table__case" colspan="1" id="totalPrice">${basket.getFormatedTotalPrice()}</td>
            </tr>
            `    
}

//effacer le panier
document
    .getElementById("clearBasket")
    .addEventListener("click", function(){
        localStorage.clear()
    });

//envoi du formulaire à l'api et renvoi de l'id et du total de prix
document.querySelector(`.form button `).addEventListener("click", function(e){
    e.preventDefault();
    var valid = true;
    for(let input of document.querySelectorAll(".form button")){
        valid &= input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        alert("Votre message à bien été envoyé")
        let contact = {firstName : document.getElementById("firstName").value, lastName : document.getElementById("lastName").value, email : document.getElementById("email").value, address : document.getElementById("address").value, city : document.getElementById("city").value};
        let products = [];
        let basket = getBasket()
        for( let i of basket) {
            products.push(i._id)
        };
        let data = {contact, products};
        

        fetch(`http://localhost:3000/api/furniture/order`, {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
    
        .then(function(res){
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(res){
            const orderId = res.orderId
            const basket = new Basket(listBasket)
            const price = basket.getTotalPrice()
            console.log(price)
            localStorage.clear();
            window.location.href = "confirmation.html?orderId="+orderId+"&price="+price

        });
    }
});