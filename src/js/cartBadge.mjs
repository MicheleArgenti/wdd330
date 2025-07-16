
import { getLocalStorage } from './utils.mjs';

export function initCartBadge() {
  const badge = document.getElementById('cart-badge');
  const cartIcon = document.getElementById('cart-icon');

  function updateBadge() {
    const items = getLocalStorage('so-cart') || [];
    const count = items.length;
    if (count > 0) {
      badge.textContent = count;
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  }

  updateBadge();


  cartIcon.addEventListener('animationend', () => {
    cartIcon.classList.remove('shake');
  });

 
  window.updateCartBadge = () => {
    updateBadge();
    cartIcon.classList.add('shake');
  };
}
