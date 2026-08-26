// Get data from LocalStorage

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];


// Total Products

document.querySelector("#totalProducts").textContent = products.length;


// Total Customers

document.querySelector("#totalCustomers").textContent = customers.length;


// Total Sales

let totalSales = 0;

sales.forEach(function (sale) {

    totalSales += Number(sale.amount);

});

document.querySelector("#totalSales").textContent = "₹" + totalSales;


// Low Stock

let lowStock = products.filter(function (product) {

    return Number(product.quantity) <= 5;

});

document.querySelector("#lowStock").textContent = lowStock.length;


// Recent Sales

const recentSales = document.querySelector("#recentSales");


sales.slice(-5).reverse().forEach(function (sale) {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${sale.customer}</td>
        <td>${sale.product}</td>
        <td>${sale.quantity}</td>
        <td>₹${sale.amount}</td>
        <td>${sale.date}</td>
    `;

    recentSales.appendChild(row);

});
