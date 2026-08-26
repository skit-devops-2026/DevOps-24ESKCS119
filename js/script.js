const productForm = document.querySelector("#productForm");
const productTable = document.querySelector("#productTable");


// Load products when page opens
let products = JSON.parse(localStorage.getItem("products")) || [];


// Display products
function displayProducts() {

    productTable.innerHTML = "";

    products.forEach(function (product, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="delete-btn" onclick="deleteProduct(${index})">
                    Delete
                </button>
            </td>
        `;

        productTable.appendChild(row);
    });
}


// Add Product
productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#productName").value;
    const category = document.querySelector("#category").value;
    const price = document.querySelector("#price").value;
    const quantity = document.querySelector("#quantity").value;

    const product = {
        name: name,
        category: category,
        price: price,
        quantity: quantity
    };

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    productForm.reset();

    displayProducts();
});


// Delete Product
function deleteProduct(index) {

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
}


// Run when page loads
displayProducts();