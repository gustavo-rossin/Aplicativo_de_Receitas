import styled from 'styled-components';

export const doneRecipeContainer = styled.div`
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
`;

export const filtersContainer = styled.div`
display: flex;
justify-content: center;
position: relative;
z-index: 0;
top: 30px;
left: -3px;
margin: auto;
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

export const pageTitle = styled.h3`
color: #41197F;
text-align: center;
font-weight: 700;
position: relative;
top: 20px;

`;

export const buttonFilter = styled.button`
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

export const recipesContainer = styled.div`

padding-top: 70px;
`;
