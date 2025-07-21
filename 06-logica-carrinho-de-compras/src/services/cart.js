// assinatura do método:
// quais ações meu carrinho pode fazer?

// CASOS DE USO
// -> adicionar um item
async function addItem(userCart, item) {
    userCart.push(item);
}

// -> calcular total
async function calculateTotal(userCart) {
    console.log("\nShopee Cart TOTAL IS:");
    
    const result = userCart.reduce((total, item) => total + item.subtotal(), 0); // interage com todos os itens
    console.log(`Total: ${result} 💵\n`);
}

// -> deletar item
async function deleteItem(userCart, name) {
    const index = userCart.findIndex((item) => item.name === name);

    if(index !== -1){
        userCart.splice(index, 1);
    }
}

// -> remover um item - diminui um item
async function removeItem(userCart, item){
    // 1. encontrar o indice do item
    const indexFound = userCart.findIndex((p) => p.name === item.name);

    // console.log("Item encontrado no index: ")
    // console.log(indexFound);

    // 2. caso não encontre o item
    if(indexFound === -1){
        console.log("item não encontrado");
        return;
    }

    // 3. item > 1, subtrair um item
    if(userCart[indexFound].quantity > 1){
        userCart[indexFound].quantity -= 1;
    }

    // 4. caso item = 1, deletar o item
    else if(userCart[indexFound].quantity === 1){
        userCart.splice(indexFound, 1);
    }
    /*//transforma o indice visual do usuário para o indice do backend
    const deleteIndex = index - 1;

    //é maior do que zero e se é menor do que o tamanho do carrinho
    if(deleteIndex >= 0 && deleteIndex < userCart.length){
        userCart.splice(deleteIndex, 1);
    }*/
}

// -> ordenar itens do carrinho por preço
async function sortCartByPrice(userCart, ascending = true) {
    userCart.sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
    });
}
// mostra todos os itens do carrinho
async function displayCart(userCart){
    console.log("\nShoppe cart list:");
    userCart.forEach((item, index) => { 
        console.log(`${index + 1}. ${item.name} - R$ ${item.price} | ${item.quantity}x | subtotal ${item.subtotal()}`);
    });
}

// -> adicionar item na wishlist
async function addToWishlist(wishList, item) {
    const found = wishList.find((i) => i.name === item.name);

    // se for encontrado, será adicionado e se já estiver na wl, retorna uma mensagem
    if(!found) {
        wishList.push(item);
        console.log(`\n${item.name} foi adicionado à sua wishlist!`);
    } else {
        console.log(`\n${item.name} já está na sua wishlist.`);
    }
}

// mostrar todos os itens da wishlist
async function displayWishlist(wishList){
    console.log("\nYour wishlist:");
    // caso não tenha nenhum item na wl
    if (wishList.length === 0){
        console.log("Nenhum item na sua wishlist.\n");
        return;
    }

    // caso tenha itens na wl
    wishList.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} | R$ ${item.price}\n`);
    }) ;
}

const coupons = {
    "SHOPEE10": 0.10,
    "SHOPEE20": 0.20,
};

// -> aplica desconto baseado no cupom digitado
async function applyDiscount(userCart, couponCode) {
    console.log(`\nAplicando cupom: ${couponCode}`);

    const total = userCart.reduce((sum, item) => sum + item.subtotal(), 0);

    if(!coupons[couponCode]){
        console.log("⚠️ Cupom inválido.");
        console.log(`Total sem desconto: R$ ${total.toFixed(2)}`);
        return;
    }

    const discountRate = coupons[couponCode];
    const discountAmount = total * discountRate;
    const totalWithDiscount = total - discountAmount;

    console.log(`Cupom válido! Desconto de ${discountRate * 100}% aplicado.`);
    console.log(`Desconto: R$ ${discountAmount.toFixed(2)} 💸`);
    console.log(`Total com desconto: R$ ${totalWithDiscount.toFixed(2)} 🛍️`);
}

// funções exportadas
export {
    addItem,
    calculateTotal,
    deleteItem,
    removeItem,
    displayCart,
    addToWishlist,
    displayWishlist,
    sortCartByPrice,
    applyDiscount,
}