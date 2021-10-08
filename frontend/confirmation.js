//accéder aux données de l'api pour retourner l'id de commande
const searchParams = new URLSearchParams(location.search);
const orderId = new URL (window.location.href).searchParams.get("orderId");
document.getElementById('result').textContent = orderId

//affichage du prix 
const totalPrice = new URL (window.location.href).searchParams.get("price");
const price = Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
}).format(totalPrice / 100);
document.getElementById('totalPriceBasket').textContent = price



