import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Product } from './Product';
import { isBrowser } from './utils/isBrowser';
import '../data/seed.js'
  
const ProductsWrapper = styled.div`
    padding-bottom: 100px;
    padding-top: 60px;
    h1 {
        text-align: center;
        border-bottom: 1px solid var(--gray-200);
        padding-bottom: 10px;
        margin-bottom: 40px;
    }
`

type TypeProduct = {
    id: number;
    title: string;
    description: string;
    url: string;
    votes: () => number;
    submitterAvatarUrl: string;
    productImageUrl: string;
}
export interface IProduct {
    product: TypeProduct;
    onVote: any;
}

export const Products = () => {
    
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const { products} = isBrowser() && window.Seed;

    useEffect(() => {
        setLoading(true);
        setData(products);
        setLoading(false);
    },[]);

    if(loading) return <div>Loading...</div>;

    const handleProductUpVote = (productId: number) => {
        const nextProducts = data.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                votes: product.votes + 1,
                });
            } else {
                return product;
            }
        });

        setData(nextProducts);
    }

    const productItems = data.sort((a, b) =>  b.votes - a.votes);

    return (
        <ProductsWrapper>
            <h1>Popular Products</h1>
            {productItems?.map((product: TypeProduct) => <Product product={product} key={product.id} onVote={handleProductUpVote} />)}
        </ProductsWrapper>
    )
}
