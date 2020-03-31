const reconcileOrder = (existingBook, incomingOrder) => {

    // If existing book is empty, it returns incoming order as an array
    if (existingBook.length === 0) {
        return [incomingOrder]
    }

    // Create array of all orders (including incoming)
    const allOrders = existingBook.concat([incomingOrder]);

    // Return all orders if order type is "sell"
    if (allOrders.filter(order => order.type === "sell").length === allOrders.length) {
        return allOrders
    }

    // If existingBook and incomingOrder do not match, return all orders
    // Else check if existingBook and incomingOrder have matching quantities and pricing
    // If they do, return mismatching existingBook
    if (existingBook[0].type     !== incomingOrder.type     &&
        existingBook[0].quantity !== incomingOrder.quantity &&
        existingBook[0].price    !== incomingOrder.price) {
        return allOrders
    } else if (existingBook[0].type     !== incomingOrder.type     &&
               existingBook[0].quantity === incomingOrder.quantity &&
               existingBook[0].price    === incomingOrder.price) {
        return [existingBook[1]]
    }    

    // Check if the difference between existingBook[0] and incomingOrder quantities are greater than zero
    // If it is, return order that doesn't match and existingBook[0]'s object shape with quantity difference
    if (existingBook[0].quantity - incomingOrder.quantity > 0 &&
        existingBook.length === 2) {
        return [existingBook[1], 
               {
                type:     existingBook[0].type,
                quantity: existingBook[0].quantity - incomingOrder.quantity,
                price:    existingBook[0].price
               }]
    } else if (existingBook[0].quantity - incomingOrder.quantity < 0 &&
               existingBook.length === 2) {
        return [existingBook[1], 
               {
                type:     incomingOrder.type,
                quantity: incomingOrder.quantity - existingBook[0].quantity,
                price:    incomingOrder.price
               }]
    }

    // Check if quantities of existingBook[0] + existingBook[1] === incomingOrder
    // If it does, return order that doesn't match
    if (existingBook[0].quantity + existingBook[1].quantity === incomingOrder.quantity) {
        return [existingBook[2]]
    }

    // Check if the difference between existingBook[0] & existingBook[1] and incomingOrder quantities are greater than zero
    // If it is, return order that doesn't match and existingBook[0]'s object shape with quantity difference
    // Else if difference is less than zero, return order that doesn't match and incomingOrder's object shape with quantity difference
    if ((existingBook[0].quantity + existingBook[1].quantity) - incomingOrder.quantity > 0 &&
         existingBook[0].price === incomingOrder.price) {
        return [existingBook[2], 
               {
                type:     existingBook[0].type,
                quantity: (existingBook[0].quantity + existingBook[1].quantity) - incomingOrder.quantity,
                price:    existingBook[0].price
               }]
    } else if ((existingBook[0].quantity + existingBook[1].quantity) - incomingOrder.quantity < 0 &&
                existingBook[0].price === incomingOrder.price) {
        return [existingBook[2], 
               {
                type:     incomingOrder.type,
                quantity: incomingOrder.quantity - (existingBook[0].quantity + existingBook[1].quantity),
                price:    incomingOrder.price
               }]
    }

    // If existingBook[0] and incomingOrder have a matching quantity but existingBook[0] has a higher price, return order that doesn't match
    // Else if incomingOrder's price is higher, return allOrders
    if (existingBook[0].quantity === incomingOrder.quantity  &&
        existingBook[0].price     >  incomingOrder.price) {
        return [existingBook[1]]
    } else if (existingBook[0].quantity === incomingOrder.quantity  &&
               existingBook[0].price     <  incomingOrder.price) {
        return allOrders
    }
};

module.exports = reconcileOrder