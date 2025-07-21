import createItem from "./services/item.js";
import * as cartServices from "./services/cart.js";

const myCart = [];
const myWishList = [];

// CHAMANDO: CARRINHO
console.log("Welcome to the your Shopee Cart!");

//criando itens
const item1 = await createItem("miniatura ferrari", 105.99, 1);
const item2 = await createItem("miniatura mercedes", 290.99, 3);
const item3 = await createItem("miniatura mc laren", 139.99, 4);
const item4 = await createItem("miniatura red bull", 199.99, 4);

// adicionei dois itens no carrinho
await cartServices.addItem(myCart, item1);
await cartServices.addItem(myCart, item2);
await cartServices.addItem(myCart, item3);
await cartServices.addItem(myCart, item4);

// removi duas unidades do item 2
// await cartServices.removeItem(myCart, item2);
// await cartServices.removeItem(myCart, item2);

// deletei dois itens do carrinho
// await cartServices.deleteItem(myCart, item2.name);
// await cartServices.deleteItem(myCart, item1.name);

// momstra todos os itens do carrinho
await cartServices.sortCartByPrice(myCart); // mostra em ordem crescente
await cartServices.displayCart(myCart);

await cartServices.applyDiscount(myCart, "SHOPEE10");
// ou teste com cupom inválido:
// await cartServices.applyDiscount(myCart, "INVALIDO");

//calcula o valor total do carrinho
// await cartServices.calculateTotal(myCart);

// CHAMANDO: WISHLIST
// adicionei um item a wl
await cartServices.addToWishlist(myWishList, item2);

// mostra todos os itens da wl
await cartServices.displayWishlist(myWishList);