// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');
export const addToCart = (id) => {
  const item = cart.find((product) => product.id === id);
  if (!item) {
    let product = findProduct(id);
    // add item to the cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add item to DOM
    addToCartDOM(product);
  } else {
    // update values
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  // add one to item count
  // eslint-disable-next-line no-use-before-define
  displayCartItemCount();
  // eslint-disable-next-line no-use-before-define
  displayCartTotal();
  // display cart totals
  // set cart in localStorage
  setStorageItem('cart', cart);
  openCart();
};
function displayCartItemCount() {
  console.log(cart);
  const amount = cart.reduce(
    // eslint-disable-next-line no-param-reassign
    (total, cartItem) => (total += cartItem.amount),
    0
  );
  cartItemCountDOM.textContent = amount;
}
function displayCartTotal() {
  const totalAmount = cart.reduce(
    // eslint-disable-next-line no-param-reassign
    (total, cartItem) => (total += cartItem.price * cartItem.amount),
    0
  );
  cartTotalDOM.textContent = `Total : ${formatPrice(totalAmount)}`;
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      // eslint-disable-next-line no-param-reassign
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      // eslint-disable-next-line no-param-reassign
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target;
    const { parentElement } = e.target;
    const elementId = e.target.dataset.id;
    const parentId = e.target.parentElement.dataset.id;
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(elementId);
      element.parentElement.parentElement.remove();
    }
    if (parentElement.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentId);
      parentElement.nextElementSibling.textContent = newAmount;
    }
    if (parentElement.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentId);
      if (newAmount === 0) {
        removeItem(parentId);
        parentElement.parentElement.parentElement.remove();
      } else {
        parentElement.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}
function displayCartItemsDOM() {
  cart.forEach((cartItem) => addToCartDOM(cartItem));
}

function init() {
  // display cart items count
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemsDOM();
  // setup cart FUNCTIONALITY
  setupCartFunctionality();
}
init();
