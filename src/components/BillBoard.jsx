import React, { useContext } from 'react';
import { ShopContaxt } from '../contexts/ShopContext'; // Adjust the path as needed
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import base Swiper styles
import 'swiper/css/navigation'; // Import navigation module styles
import { Navigation } from 'swiper/modules'; // Import the Navigation module
import { Link } from 'react-router-dom';

function BillBoard() {
    // Get products and loading state from the ProductsContext
    const { products, loading, error } = useContext(ShopContaxt);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Display the first 2 products as slides for demonstration
    const slides = products.slice(0, 2);

    return (
        <section id="billboard" className="overflow-hidden">
            <Swiper
                modules={[Navigation]} // Register the Navigation module here
                navigation={{
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                }}
                className="main-swiper"
                loop={true}
                spaceBetween={0}
            >
                {slides.map((product) => (
                    <SwiperSlide
                        key={product.id}
                        style={{
                            backgroundImage: `url(${product.image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            height: 'auto',
                            backgroundPosition: 'right',
                        }}
                    >
                        <div className="banner-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2 className="banner-title" style={{ fontSize: '24px' }}>{product.title}</h2>
                                        <p>{product.description}</p>
                                        <div className="btn-wrap">
                                            <Link
                                                to="/shop"
                                                className="btn btn-light btn-medium d-flex align-items-center"
                                                tabIndex="0"
                                            >
                                                Shop it now <i className="icon icon-arrow-io"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="button-prev">
                <i className="icon icon-chevron-left"></i>
            </button>
            <button className="button-next">
                <i className="icon icon-chevron-right"></i>
            </button>
        </section>
    );
}

export default BillBoard;
