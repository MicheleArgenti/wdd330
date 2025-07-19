import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      removeItem(index);
    });
  });
  
  populateTotalCart();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button data-index="${index}" class="remove-btn">X</button>
</li>`;

  return newItem;
}

function populateTotalCart() {
  document.getElementById("cart-footer").classList.add("unhide");
  const totalTents = document.getElementsByClassName("cart-card__price");
  let total = 0;
  for (let i = 0; i < totalTents.length; i++) {
    total += Number(totalTents[i].innerHTML.substring(1));
  }
  document.getElementById("cart-total").innerHTML = `Total: $${total}`
}

function removeItem(index) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
  if (cartItems.length === 0) {
    document.getElementById("cart-footer").classList.remove("unhide");
  }
}

renderCartContents();