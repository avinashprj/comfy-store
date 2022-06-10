import { getStorageItem, setStorageItem } from './utils.js';

// eslint-disable-next-line import/no-mutable-exports
let store = getStorageItem('store');
const setupStore = (products) => {
        store = products.map((product) => {
                const {
                        id,
                        fields: { featured, company, colors, name, price, image: img },
                } = product;
                const image = img[0].thumbnails.large.url;
                return { id, featured, company, colors, name, price, image };
        });
        setStorageItem('store', store);
};
// console.log(store);
const findProduct = (id) => {
        // eslint-disable-next-line no-shadow
        const product = store.find((product) => product.id === id);
        return product;
};
export { store, setupStore, findProduct };
