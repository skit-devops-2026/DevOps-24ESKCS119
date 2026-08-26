const salesForm = document.querySelector("#salesForm");
const salesTable = document.querySelector("#salesTable");

let sales = JSON.parse(localStorage.getItem("sales")) || [];

function displaySales() {

    salesTable.innerHTML = "";

    sales.forEach(function (sale, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${sale.customer}</td>
            <td>${sale.product}</td>
            <td>${sale.quantity}</td>
            <td>₹${sale.amount}</td>
            <td>${sale.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteSale(${index})">
                    Delete
                </button>
            </td>
        `;

        salesTable.appendChild(row);
    });
}

salesForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const customer = document.querySelector("#customerName").value;
    const product = document.querySelector("#saleProduct").value;
    const quantity = document.querySelector("#saleQuantity").value;
    const amount = document.querySelector("#saleAmount").value;
    const date = document.querySelector("#saleDate").value;

    const sale = {
        customer: customer,
        product: product,
        quantity: quantity,
        amount: amount,
        date: date
    };

    sales.push(sale);

    localStorage.setItem("sales", JSON.stringify(sales));

    salesForm.reset();

    displaySales();
});

function deleteSale(index) {

    sales.splice(index, 1);

    localStorage.setItem("sales", JSON.stringify(sales));

    displaySales();
}

displaySales();