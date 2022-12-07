import styled from 'styled-components';

export const topImg = styled.img`
width: 100%;
height: 180px;
filter: contrast(45%)
`;

export const recipeTitle = styled.h1`
position: relative;
bottom: 100px;
font-family: 'Epilogue';
font-style: normal;
font-weight: 1000;
font-size: 20px;
line-height: 20px;
text-align: center;
letter-spacing: 0.105em;
text-transform: uppercase;
color: #FFFFFF;
`;

export const categoryContainer = styled.div`
position: absolute;
top: 0;
display: flex;
align-items: center;
gap: 5px;
color: #FCC436;
filter: contrast(200%);
padding: 4px;
`;

export const categoryTitle = styled.span`
font-weight: 700;
font-size: 12px;
`;

export const ingredientsUl = styled.ul`
border: 0.554397px solid #B1B1B1;
border-radius: 5.35144px;
width: 95%;
margin: auto;
background-color: whitesmoke;
`;

export const ingredientTitle = styled.h2`
text-align: center;
color: #41197F;
font-weight: 700;
font-size: 1.7em;
`;

export const instructionTitle = styled.h2`
text-align: center;
margin-top: 15px;
color: #41197F;
font-weight: 800;
font-size: 1.7em;
`;

export const instructionContainer = styled.div`
border-radius: 5.35144px;
width: 95%;
margin: auto;
border: 0.554397px solid #B1B1B1;
background-color: whitesmoke;
`;

export const instructionText = styled.p`
padding: 10px;

`;
