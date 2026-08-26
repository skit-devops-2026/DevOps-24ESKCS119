// Get products from LocalStorage

let products = JSON.parse(localStorage.getItem("products")) || [];

const inventoryTable = document.querySelector("#inventoryTable");


// Display Inventory

function displayInventory() {

    inventoryTable.innerHTML = "";

    products.forEach(function (product) {

        const row = document.createElement("tr");

        let status;

        if (Number(product.quantity) <= 5) {
            status = "Low Stock";
        } else {
            status = "In Stock";
        }

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.quantity}</td>
            <td>${status}</td>
        `;

        inventoryTable.appendChild(row);

    });
}


displayInventory();
// Inventory Summary

let inStock = products.filter(function (product) {
    return Number(product.quantity) > 5;
});

let lowStock = products.filter(function (product) {
    return Number(product.quantity) > 0 &&
           Number(product.quantity) <= 5;
});

let outOfStock = products.filter(function (product) {
    return Number(product.quantity) === 0;
});


document.querySelector("#inventoryTotal").textContent = products.length;

document.querySelector("#inventoryInStock").textContent = inStock.length;

document.querySelector("#inventoryLowStock").textContent = lowStock.length;

document.querySelector("#inventoryOutStock").textContent = outOfStock.length;