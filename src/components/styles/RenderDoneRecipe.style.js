import styled from 'styled-components';

export const recipeMainContainer = styled.div`
border: 0.517989px solid #B1B1B1;
border-radius: 5px;
display: flex;
flex-direction: column;
align-items: center;
`;

export const recipeContainer = styled.div`
display: flex;
overflow-x: hidden;
`;

export const recipeImg = styled.img`
width: 120px;
height: 100px;
margin: 0;
position: relative;
top: 50px;
`;

export const doneDate = styled.p`
text-indent: 10px;
position: relative;
left: -7px;
`;

export const InfosContainter = styled.div`
text-align: center;
margin-bottom: 10px;
`;

export const recipeTitle = styled.p`
font-style: normal;
font-weight: 700;
font-size: 22px;
position: relative;
top: 7px;
color: #1A1B1C;
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

export const tagsContainer = styled.div`
display: grid;
grid-template-columns: repeat(2, auto);
gap: 9px;
`;

export const tag = styled.span`
background: #D9D9D9;
border-radius: 10px;
position: relative;
text-align: center;
color: #797D86;
font-size: 1em;
width: 7.5em;
padding: 2px;
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
font-size: 15px;
position: relative;
height: 30px;
font-weight: 700;
`;
