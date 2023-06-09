// Wait for the document to be fully loaded
    document.addEventListener("DOMContentLoaded", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
      const productDetails = document.getElementById("product-details");

      // Fetch product details by ID and display them
      fetch(`http://localhost:8081/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          renderProductDetails(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Render the product details
      function renderProductDetails(product) {
        const productDetailsHTML = `
          <p>Product ID: ${product.productId}</p>
          <p>Name: ${product.productName}</p>
          <p>Price: ${product.unitPrice}</p>
          <p>Description: ${product.description}</p>
          <p>Category: ${product.category}</p>
        `;

        productDetails.innerHTML = productDetailsHTML;
      }
    });