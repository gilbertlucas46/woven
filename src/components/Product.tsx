import React from 'react';
import { IProduct } from './Products';
import styled from 'styled-components';
import { Link } from 'gatsby';



const ProductCard = styled.div`

`
const ProductImage = styled.div`

`

const ProductCaption = styled.div`

`
const ProductAutor = styled.div`

`

export const Product = ({product, handleVote}: IProduct) => {
    const { id,  title, description, url, votes, submitterAvatarUrl, productImageUrl } = product;

    return (
        <ProductCard key={id}>
            <ProductImage>

            </ProductImage>
            <ProductCaption>
                <h4>
                    <Link to={title}>
                        <a>{title}</a>
                    </Link>
                </h4>
                <p> {description} </p>
                <ProductAutor>
                    Submited by: 
                </ProductAutor>
            </ProductCaption>
        </ProductCard>
    )
}


