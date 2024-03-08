document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();
});

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    });
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const image = document.createElement('img');
        image.src = product.image;
        productDiv.appendChild(image);

        const title = document.createElement('h4');
        title.textContent = product.title;
        productDiv.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;
        productDiv.appendChild(price);

        const category = document.createElement('p');
        category.textContent = `Category: ${product.category}`;
        productDiv.appendChild(category);

        productList.appendChild(productDiv);
    });
}

function sortProducts(order) {
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.children);
    const sortedProducts = products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('p').textContent.split('$')[1]);
        const priceB = parseFloat(b.querySelector('p').textContent.split('$')[1]);
        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });
    productList.innerHTML = '';
    sortedProducts.forEach(product => {
        productList.appendChild(product);
    });
}

document.getElementById('category-filter').addEventListener('change', function() {
    const category = this.value;
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const filteredProducts = data.filter(product => product.category === category);
        displayProducts(filteredProducts);
    });
});
