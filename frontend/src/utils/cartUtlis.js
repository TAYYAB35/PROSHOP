export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => { // calculate items price (id order is over $100 then free , else $10 shipping)
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // calculate shipping price
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

    // calculate tax price (15% tax)
    state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice)));

    // calculate total price (items price + shipping price + tax price)
    state.totalPrice = addDecimal(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice));

    localStorage.setItem('Cart', JSON.stringify(state));
    
    return state;
}