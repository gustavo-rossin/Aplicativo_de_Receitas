import styled from 'styled-components';

export const profileContainer = styled.div`
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

export const pageTitle = styled.h3`
color: #41197F;
text-align: center;
font-weight: 700;
position: relative;
top: 20px;
`;

export const email = styled.p`
color: #1A1B1C;
text-align: center;
font-weight: 700;
position: relative;
top: 20px;
`;

export const buttonsContainer = styled.div`
display: flex;
flex-direction: column;
padding-top: 40px;
`;

export const buttonContainer = styled.div`
position: relative;
left: 30px;
`;

export const button = styled.button`
background-color: transparent;
border-color: transparent;
color: #FCC436;
;
`;

export const buttonIcon = styled.span`
font-size: 40px;
position: relative;
top: 14px;
`;

export const textBtn = styled.span`
font-style: normal;
font-weight: 600;
color: #797D86;
font-size: 16px;
line-height: 16px;
letter-spacing: 0.03em;
cursor: pointer;
`;

export const footerContainer = styled.div`
position: fixed;
width: 100%;
bottom: 0;
`;
