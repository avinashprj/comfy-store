import { getElement, formatPrice } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');
  // setupValue
  let maxPrice = store.map((product) => product.price);
  maxPrice = Math.max(...maxPrice);
  maxPrice = formatPrice(maxPrice);
  maxPrice = maxPrice.replace(/[,₹]/g, '');
  maxPrice = parseInt(maxPrice);
  maxPrice += 0.99;
  maxPrice = Math.ceil(maxPrice);

  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceInput.value = maxPrice;
  priceValue.textContent = `Value : ₹${maxPrice}`;

  priceInput.addEventListener('input', () => {
    const value = parseInt(priceInput.value);

    priceValue.textContent = `Value : ₹${value}`;
    const newStore = store.filter(
      (product) => (product.price / 100) * 75 <= value
    );
    display(newStore, getElement('.products-container'), true);
    if (newStore.length < 1) {
      const products = getElement('.products-container');
      products.innerHTML = `<h3 class="filter-error">Sorry, no products matched your results</h3>`;
    }
  });
};

export default setupPrice;
