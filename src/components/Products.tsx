import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Product } from './Product';
import { isBrowser } from './utils/isBrowser';
import '../data/seed.js'
  
const ProductsWrapper = styled.div`

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
    const { products, generateVoteCount } = window.Seed;

    return (
        <ProductsWrapper>
            {
                products.map((product: TypeProduct) => {
                    return (
                        <Product product={product} handleVote={generateVoteCount}/>
                    )
                })
            }
        </ProductsWrapper>
    )
}
