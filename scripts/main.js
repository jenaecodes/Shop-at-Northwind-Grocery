// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const searchTypeSelect = document.getElementById("searchType");
  const categoryDropdown = document.getElementById("categoryDropdown");
  const categorySelect = document.getElementById("category");
  const productList = document.getElementById("productList");

  // event listener for search type selection
  searchTypeSelect.addEventListener("change", () => {
    if (searchTypeSelect.value === "category") {
      categoryDropdown.style.display = "block";
      populateCategories();
    } else {
      categoryDropdown.style.display = "none";
      fetchAllProducts();
    }
  });

  // event listener for category selection
  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    fetchProductsByCategory(selectedCategory);
  });

  // fetch all products and display them
  function fetchAllProducts() {
    fetch("http://localhost:8081/api/products")
      .then((response) => response.json())
      .then((data) => {
        renderProductList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // fetch categories and populate the dropdown
  function populateCategories() {
    fetch("http://localhost:8081/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((category) => `<option>${category}</option>`);
        categorySelect.innerHTML = options.join("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // fetch products by category and display them
  function fetchProductsByCategory(category) {
    fetch(`http://localhost:8081/api/products?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        renderProductList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // render the product list
  function renderProductList(products) {
    const productListHTML = products
      .map(
        (product) => `
        <div>
          <p>Product ID: ${product.productId}</p>
          <p>Name: ${product.productName}</p>
          <p>Price: ${product.unitPrice}</p>
          <a href="product-details.html?id=${product.productId}">See details</a>
        </div>
      `
      )
      .join("");

    productList.innerHTML = productListHTML;
  }
});
