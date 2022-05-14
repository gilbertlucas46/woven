import React from 'react';
import { IProduct } from './Products';
import styled from 'styled-components';
import { graphql, useStaticQuery } from "gatsby";
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const ProductCard = styled.div`
    display: grid;
    gap: 20px;
    margin-bottom: 30px;
    box-shadow: 0 0 20px var(--gray-200);
    border-radius: 4px;
    transition: all 0.4s;
    cursor: pointer;
    &:hover {
        transform: scale(1.08);
        box-shadow: 0 0 20px var(--gray-300);
    }
    @media (min-width: 767px) {
        grid-template-columns: 250px 1fr;
    }
    button {
        background-color: transparent;
        border: 0;
        display: flex;
        align-items: center;
        padding: 0;
        margin-bottom: 20px;
        font-size: 18px;
        color: var(--gray-800);
        cursor: pointer;
        transition: all 0.4s;
        svg {
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
        &:hover {
            svg {
                fill: var(--gray-900);;
            }
            color: var(--gray-900);;
        }
    }
`
const ProductImage = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 100%;
        border-radius: 4px;
        @media (min-width: 767px) {
            border-radius: 4px 0 0 4px;
        }
    }
`

const ProductCaption = styled.div`
    display: flex;
    align-items: center;
    h4 {
        margin-top: 0;
        font-size: 24px;
        color: var(--purple-2);
        margin-bottom: 15px;
        font-weight: 600;
        line-height: 1.2;
    }
    p {
        margin-top: 0;
        color: var(--gray-600);
        font-size: 21px;
        line-height: 1.2;
        font-weight: 300;
    }
`
const ProductAutor = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-right: 10px;
        color: var(--gray-600);
    }
    img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }
`

export const Product = ({product, onVote }: IProduct) => {
    const { id,  title, description, url, votes, submitterAvatarUrl, productImageUrl } = product;
    const productImgPath = productImageUrl.split('/');
    const AvatarImgPath = submitterAvatarUrl.split('/');
    const productImgName = productImgPath[productImgPath.length - 1];
    const avatarImgName = AvatarImgPath[AvatarImgPath.length - 1];


    const data = useStaticQuery(graphql`
        query {
            allFile( filter: { internal: { mediaType: { regex: "images/" } } } ) {
                edges {
                    node {
                        relativePath
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    `)

    const allImages = data.allFile.edges.map(item => item.node).map(img => img.childImageSharp).map(img => img.fluid).map(img => img.src)
    const match = name => allImages.find(element => {
        if (element.includes(name)) {
          return true;
        }
    });

    const handleUpVote = () => (
        onVote(product.id)
    );

    return (
        <ProductCard key={id}>
            <ProductImage>
                <img src={match(productImgName)} alt="" />
            </ProductImage>
            <ProductCaption>
                <div>
                    <button onClick={handleUpVote}><BsFillArrowUpCircleFill/> {votes}</button>
                    <h4><a href={url}>{title}</a> </h4>
                    <p> {description} </p>
                    <ProductAutor>
                        <span>Submited by: </span>
                        <img src={match(avatarImgName)} alt="" />
                    </ProductAutor>
                </div>
            </ProductCaption>
        </ProductCard>
    )
}
