import styled from 'styled-components';

export const searchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: auto;
    top: 70px;
    height: 150px;
    z-index: 1;
`;

export const searchInput = styled.input`
width: 249px;
border-radius: 5px 5px 0px 0px;
`;

export const radioBtnContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
height: 110px;
background: #41197F;
border-radius: 0px 0px 10px 10px;

`;

export const radioContainer = styled.div`
color: white;
display: flex;
gap: 6px;
`;

export const buttonSearch = styled.button`
background: #FCC436;
width: 150px;
color: white;
font-style: normal;
font-weight: 700;
font-size: 13px;
height: 30px;
border-radius: 5px;
text-align: center;
letter-spacing: 0.03em;
text-transform: uppercase;
:hover{
    border: 1px solid black;
}
`;
