let carts = document.querySelectorAll(".btn");
let products = [
  {
    name: "Coffe beans",
    img: "https://cdn2.vectorstock.com/i/1000x1000/74/86/paper-packaging-with-label-for-coffee-bean-vector-15767486.jpg",
    price: 3,
    inCart: 0,
  },
  {
    name: "Latte",
    img: "https://ae01.alicdn.com/kf/H734f3517c22c4a579a03e5a1c766c9bbl/Luxury-Gold-Inlay-Ceramic-Coffee-Cup-and-Saucer-Coffee-Cup-Set-Holder-Green-Color-Milk-Tea.jpg",
    price: 1.5,
    inCart: 0,
  },
  {
    name: "Cappucino",
    img: "./images/cappuccino.jpg",
    price: 2.0,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
function onloadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  document.querySelector("#cart-btn span").textContent = productNumbers;
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#cart-btn span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#cart-btn span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.img] == undefined) {
      cartItems = {
        ...cartItems,
        [product.img]: product,
      };
    }
    cartItems[product.img].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.img]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else localStorage.setItem("totalCost", product.price);
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        
        <div class="products">
          <ion-icon type="button" class="remove-btn" name="close-circle"></ion-icon>
          <div class="details">
          <img src="${item.img}"  width="100px"  >
         <span>${item.name}</span>
         </div>
         <div class="price">${item.price}kd</div>
         <div class="quantity">
         <ion-icon name="caret-back-outline"></ion-icon>
  
         <span>${item.inCart}</span>
         <ion-icon name="caret-forward-outline"></ion-icon>
       </div>
       <div class="total">
       ${item.inCart * item.price}kd
       </div>
       
          </div>
  
         
        
          `;
    });
    productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
      Basket Total
      </h4>
      <h4 class="basketTotal">${cartCost}kd</h4>
      
      
      </div>
      `;
  }
}

onloadCartNumbers();
displayCart();
