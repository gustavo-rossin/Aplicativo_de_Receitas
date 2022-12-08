import styled from 'styled-components';

export const favoritePageContainer = styled.div`
height: 460px;
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

export const pageTitle = styled.h3`
color: #41197F;
text-align: center;
font-weight: 700;
position: relative;
top: 20px;

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

export const buttonFilter = styled.button`
border-radius: 100%;
display: flex;
justify-content: center;
align-items: center;
border: 2px solid #FCC436;
background-color: white;
width: 60px;
height: 60px;
:hover {
  transform: translateY(1px);
}
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

export const footerDiv = styled.div`
position: absolute;
bottom: 0;
width: 100%;
`;

export const recipeContainer = styled.div`
border: 0.517989px solid #B1B1B1;
border-radius: 5px;
display: flex;
height: 190px;
overflow: hidden;
`;

export const shareFavContainer = styled.div`
position: relative;
left: 10px;
`;

export const shareBtn = styled.button`
background-color: transparent;
border-color: transparent;
color: #FCC436;

`;

export const shareIcon = styled.span`
color: #FCC436;
background-color: transparent;
font-size: 30px;
`;

export const linkCopied = styled.span`
color: #FCC436;
font-size: 12px;
position: relative;
font-weight: 700;
`;

export const favoriteBtn = styled.button`
background-color: transparent;
border-color: transparent;
color: #FCC436;
`;

export const favIcon = styled.span`
font-size: 30px;
opacity: 0.8;
`;

export const nationality = styled.p`
font-style: normal;
font-weight: 700;
position: relative;
top: -9px;
font-size: 12px;
text-align: center;
color: #797D86;
`;

export const recipeImg = styled.img`
width: 120px;
height: 100px;
position: relative;
top: 50px;
`;

export const recipeTitle = styled.p`
font-style: normal;
font-weight: 700;
font-size: 22px;
position: relative;
top: 7px;
color: #1A1B1C;
:hover {
  transform: translateY(1px);
}
`;

export const InfosContainer = styled.div`
text-align: center;
`;
