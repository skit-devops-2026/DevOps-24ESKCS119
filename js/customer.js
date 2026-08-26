const customerForm = document.querySelector("#customerForm");
const customerTable = document.querySelector("#customerTable");

let customers = JSON.parse(localStorage.getItem("customers")) || [];

function displayCustomers() {

    customerTable.innerHTML = "";

    customers.forEach(function (customer, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email}</td>
            <td>₹${customer.purchases}</td>
            <td>
                <button class="delete-btn" onclick="deleteCustomer(${index})">
                    Delete
                </button>
            </td>
        `;

        customerTable.appendChild(row);
    });
}


customerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#customerName").value;
    const phone = document.querySelector("#customerPhone").value;
    const email = document.querySelector("#customerEmail").value;

    const customer = {
        name: name,
        phone: phone,
        email: email,
        purchases: 0
    };

    customers.push(customer);

    localStorage.setItem("customers", JSON.stringify(customers));

    customerForm.reset();

    displayCustomers();
});


function deleteCustomer(index) {

    customers.splice(index, 1);

    localStorage.setItem("customers", JSON.stringify(customers));

    displayCustomers();
}


displayCustomers();