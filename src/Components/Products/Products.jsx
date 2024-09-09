import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Products.css';

const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost/product.php');
    if (!data.success) {
        throw new Error(data.message);
    }
    return data.data;
};

function Products({ limit }) {
    const [searchedArr, setSearchedArr] = useState([]);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [cartQuantities, setCartQuantities] = useState(() => JSON.parse(localStorage.getItem('cartQuantities')) || {});
    const { data: products, error, isLoading } = useQuery('products', fetchProducts, {
        cacheTime: 2000,
        refetchOnMount: false,
    });

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        if (products) {
            let sortedProducts = [...products];

            if (sortOrder === 'lowToHigh') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else {
                sortedProducts.sort((a, b) => b.price - a.price);
            }

            setSearchedArr(sortedProducts);
        }
    }, [products, sortOrder]);

    const updateLocalStorageQuantities = (productId, quantity) => {
        const updatedQuantities = { ...cartQuantities, [productId]: quantity };
        if (quantity < 1) delete updatedQuantities[productId];
        setCartQuantities(updatedQuantities);
        localStorage.setItem('cartQuantities', JSON.stringify(updatedQuantities));
    };

    async function addToCart(productId, quantity = 1, price) {
        try {
            const touristId = localStorage.getItem('tourist_id');
            if (!touristId) {
                throw new Error('Tourist-Id is missing from local storage');
            }

            const formData = new FormData();
            formData.append('product_id', productId);
            formData.append('quantity', quantity);
            formData.append('price', price);

            const response = await axios.post('http://localhost/add_p_cart.php', formData, {
                headers: {
                    'Tourist-Id': touristId,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Product added to cart successfully!');
            updateLocalStorageQuantities(productId, quantity);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Product already added');
        }
    }

    function search(e) {
        const term = e.target.value.toLowerCase();
        const newArr = products.filter((product) => product.product_name.toLowerCase().includes(term.trim()));
        setSearchedArr(newArr);
    }

    if (isLoading) return <div className="text-center loader-container">
        <ClipLoader color="#F9BA22" size={60} />
    </div>;
    if (error) return <div className="text-center text-danger">An error has occurred: {error.message}</div>;

    return (
        <div className="container product-ontainer">
            <h1 className="text-center mb-4 p-2 section-title">Our Products</h1>
            <Toaster />
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search"
                    onChange={search}
                />
                <select className="form-select w-auto ms-3" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
            <div className="row mt-4">
                {(searchedArr.length > 0 ? searchedArr : products).slice(0, limit).map((product) => (
                    <div key={product.product_id} className="col-md-4 mb-4">
                        <div className="card product-card" data-aos="fade-up">
                            <Link to={`/product/${product.product_id}`} className="card-link">
                                <img className="card-img-top product-img" src={product.picture} alt={product.product_name} />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="card-title">{product.product_name}</h4>
                                        <span className="product-price">{product.price} EGP</span>
                                    </div>
                                    <div className="rating-overlay">
                                        <i className="fas fa-star rating-color"></i>
                                        {product.rate}
                                    </div>
                                    <h5 className="font-sm text-main">{product.category}</h5>
                                </div>
                            </Link>
                            <div className="cart-icon-overlay">
                                {cartQuantities[product.product_id] ? (
                                    <Link to="/cart" className="btn btn-logout">
                                        Go to Cart
                                    </Link>
                                ) : (
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product.product_id, 1, product.price);
                                    }} className="btn btn-logout add-cart-icon">
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
