// Construction d'un tableau pour le localStorage

function getBasket() {
    const allBasket = localStorage.getItem("basket")
    if(allBasket == null){
        return []
    }
    else {
        return JSON.parse(allBasket)
    }
}

//class pour la récupération des infos produit
class Item {
    constructor (name, price, description, imageUrl, _id, varnish){
        this._id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl= imageUrl
        this.varnish = varnish
    }

    //conversion du prix
    getFormatedPrice(){
        const price = Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(this.price / 100);
        return price
    }
}


class lineBasket {
    constructor (name, price, description, imageUrl, _id, quantity){
        this._id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl
        this.quantity = quantity
    }   
    
    //conversion du prix
    getFormatedPrice(){
        const price = Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(this.price / 100);
        return price
    }

    //calcul du prix converti total par produit 
    getFormatedTotalLinePrice(){
        const price = Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(this.price * this.quantity / 100);
        return price
    }
}


class Basket {
    constructor (tableBasket){
        this.tableBasket = tableBasket
    }

    //ajout du produit au panier ou ajout à la quantité
    addBasket(lineBasket){
        const exist = this.check(lineBasket._id);
        if (exist){
            let index = this.tableBasket.map(function(e) { return e._id; }).indexOf(lineBasket._id);
            let lineArticle = this.tableBasket[index]
            lineArticle.quantity += lineBasket.quantity
        }else{this.tableBasket.push(lineBasket)}
        alert("Votre article à bien été ajouté au panier")
        this.saveBasket(this.tableBasket)
    }

    //fonction pour ajouter au localStorage
    saveBasket(tableBasket){
        localStorage.setItem("basket", JSON.stringify(tableBasket));
    }

    //verification de l'existence de l'id produit dans le panier
    check(item_id) {
        let exist = false;
        if (this.tableBasket.length > 0){
            for(let lineArticle of this.tableBasket){
                if (lineArticle._id == item_id){
                    exist = true;
                }
            }  
        }
        return exist;
    }

    //ajout de la quantité au produit concerné 
    addQuantity(lineBasket_id){
        let index = this.tableBasket.map(function(e) { return e._id; }).indexOf(lineBasket_id);
        let lineArticle = this.tableBasket[index]
        lineArticle.quantity ++
        this.saveBasket(this.tableBasket)
    }

    //réduction de la quantité au produit concerné 
    removeQuantity(lineBasket_id){
        let index = this.tableBasket.map(function(e) { return e._id; }).indexOf(lineBasket_id);
        let lineArticle = this.tableBasket[index]
        lineArticle.quantity --
        if (lineArticle.quantity <= 0) {
            this.deleteLineArticle(lineBasket_id)
        }else{
            this.saveBasket(this.tableBasket)
        }
    }
    
    //pour la suppression d'une ligne produit dans le panier
    deleteLineArticle(lineBasket_id){
        let index = this.tableBasket.map(function(e) { return e._id; }).indexOf(lineBasket_id);
        this.tableBasket.splice(index, 1)
        this.saveBasket(this.tableBasket)
    }

    //calcul du prix total du panier
    getTotalPrice(){
        let totalLine = 0;
        for(let line of this.tableBasket) {
            totalLine += line.price * line.quantity; 
        }
        return totalLine
    }

    //conversion du prix total du panier
    getFormatedTotalPrice(){
        let totalLine = this.getTotalPrice()
        const price = Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(totalLine / 100);
        return price
    }
    
}
