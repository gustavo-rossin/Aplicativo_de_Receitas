import styled from 'styled-components';

export const recipePageContainer = styled.div`
height: 470px;
width: 262px;
position: absolute;
background-color: white;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
overflow-y: scroll;
::-webkit-scrollbar {
  display: none;
}
overflow-x: hidden;

`;

export const pageTitle = styled.h3`
color: #41197F;
text-align: center;
position: relative;
font-weight: 700;
top: 20px;

`;

export const categoryContainer = styled.div`
display: flex;
position: relative;
z-index: 0;
top: 40px;
margin: auto;
overflow-x: scroll;
overflow-y: hidden;
::-webkit-scrollbar{
    background-color: #FCC436;
    height: 7px;
    cursor: pointer;
}

::-webkit-scrollbar-thumb{
    background-color: #41197F;
    cursor: pointer;
}
gap: 20px;
`;

export const titleButonContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 2px;
padding-left: 10px;
text-align: center;
`;

export const categoryTitle = styled.span`
margin-top: 5px;
font-family: 'Epilogue';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 10px;
text-align: center;

color: #797D86;

`;

export const buttonsCategory = styled.button`
border-radius: 100%;
display: flex;
justify-content: center;
align-items: center;
border: 2px solid #FCC436;
background-color: white;
width: 60px;
height: 60px;

`;

export const buttonIcon = styled.span`
color: #FCC436;
font-size: 40px;
`;

export const recipesContainer = styled.div`
display: flex;
flex-wrap: wrap;
position: relative;
z-index: -1;
right: 6px;
padding-top: 100px;
justify-content: center;
gap: 20px;
padding-left: 10px;
`;
