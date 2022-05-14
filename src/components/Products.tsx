import React from 'react';
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
    handleVote: any;
}

export const Products = () => {
    const { products, generateVoteCount } = isBrowser() && window.Seed;

    return (
        <ProductsWrapper>
            <h1 onClick={generateVoteCount}>Popular Products</h1>
            {products?.map((product: TypeProduct) => <Product product={product} key={product.id} handleVote={generateVoteCount}/>)}
        </ProductsWrapper>
    )
}
