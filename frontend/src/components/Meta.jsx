import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Meta = ({ title = 'Welcome to ProShop', description = 'We sell the best products for cheap', keywords = 'products, electronics, cheap products' }) => {

    return (
        <Helmet>

            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

        </Helmet>
    )
}

export default Meta