import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './ProductDetails.css';

const fetchProductDetails = async ({ queryKey }) => {
    const [, productId] = queryKey;
    const { data } = await axios.get(`http://localhost/getspecificproduct.php?product_id=${productId}`);
    if (!data.success) {
        throw new Error(data.message);
    }
    return data.data[0]; // Extract the single product object from the array
};

const ProductDetails = () => {
    const { productId } = useParams();
    const { data: product, error, isLoading } = useQuery(['productDetails', productId], fetchProductDetails, {
        cacheTime: 2000,
        refetchOnMount: false,
    });
    const [quantity] = useState(1);
    const [addCartError, setAddCartError] = useState(null);

    if (isLoading) return (
        <div className="text-center loader-container">
            <ClipLoader color="#a2801b" size={60} />
        </div>
    );
    if (error) return <div className="text-center text-danger">Error: {error.message}</div>;

    if (!product) return <div className="text-center text-danger">Product not found</div>;

    const addToCart = async () => {
        try {
            const touristId = localStorage.getItem('tourist_id');
            if (!touristId) {
                throw new Error('Tourist-Id is missing from local storage');
            }

            const formData = new FormData();
            formData.append('product_id', product.product_id);
            formData.append('quantity', quantity);
            formData.append('price', product.price);

            const response = await axios.post('http://localhost/add_p_cart.php', formData, {
                headers: {
                    'Tourist-Id': touristId,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            console.log(response.data); // Handle success response as needed
        } catch (error) {
            console.error('Error adding product to cart:', error);
            setAddCartError(error.message);
        }
    };

    return (
        <div className="container mt-5 product-details-container">
            <div className="row">
                <div className="col-md-6">
                    <img src={`http://localhost/${product.picture}`} alt={product.product_name} className="img-fluid product-details-img" />
                </div>
                <div className="col-md-6">
                    <h2>{product.product_name}</h2>
                    <p className="product-details-category">{product.category}</p>
                    <p className="product-details-price">{product.price} EGP</p>
                    <p className="product-details-description">{product.product_description}</p>
                    <p className="product-details-rating">
                        <i className="fas fa-star rating-color"></i> {product.rate}
                    </p>
                    <button onClick={addToCart} className="btn btn-logout add-cart-icon">
                    <i className="fa-solid fa-cart-plus"></i></button>
                    {addCartError && <div className="alert alert-danger mt-3">{addCartError}</div>}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
