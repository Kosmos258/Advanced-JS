const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.itpro.co.uk%2Fimage%2Fupload%2Fv1570815413%2Fitpro%2F2015%2F09%2Ftoshiba-satellite-radius-12.jpg&f=1&nofb=1&ipt=8a10f6eaf230c98eaa1fd78d8ee930140f2cb63756c9e4f25f60dbc2549689e5&ipo=images',
        products: [],
        imgProduct: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.itpro.co.uk%2Fimage%2Fupload%2Fv1570815413%2Fitpro%2F2015%2F09%2Ftoshiba-satellite-radius-12.jpg&f=1&nofb=1&ipt=8a10f6eaf230c98eaa1fd78d8ee930140f2cb63756c9e4f25f60dbc2549689e5&ipo=images'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            })
    }

});
