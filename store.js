(() => {
    const read = (key) => {
        try {
            const value = JSON.parse(localStorage.getItem(key) || '[]');
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    };

    window.StylekartStore = {
        readCart: () => read('cart'),
        saveCart: (items) => localStorage.setItem('cart', JSON.stringify(items)),
        readWishlist: () => read('wishlist'),
        saveWishlist: (items) => localStorage.setItem('wishlist', JSON.stringify(items)),
        readReviews: () => read('productReviews'),
        saveReviews: (items) => localStorage.setItem('productReviews', JSON.stringify(items)),
        readOrders: () => read('orders'),
        saveOrders: (items) => localStorage.setItem('orders', JSON.stringify(items))
    };
})();