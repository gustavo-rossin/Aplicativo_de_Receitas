import styled from 'styled-components';

export const homeContainer = styled.div`
height: 460px;
width: 262px;
position: absolute;
background-color: white;
top: 50%;
left: 50%;
display: flex;
align-items: center;
justify-content: center;
transform: translate(-50%, -50%);
overflow-y: scroll;
::-webkit-scrollbar {
  display: none;
}
`;

export const buttonRedirect = styled.button`
border: none;
background-color: transparent;
`;

export const logo = styled.img`
:hover {
  transform: translateY(1px);
}
`;

export const linkedinGitContainer = styled.div`
position: absolute;
display: flex;
justify-content: center;
gap: 40px;
background-color: rgba(7, 40, 145, 0.15);
border-radius: 10px;
width: 90%;
margin-bottom: 10px;
bottom: 0;
`;

export const linkedinImg = styled.img`
width: 40px;
border-radius: 100%;
filter: contrast(300%);
background-color: white;
:hover {
  transform: translateY(1px);
}

`;

export const githubImg = styled.img`
width: 40px;
border-radius: 100%;
background-color: white;
:hover {
  transform: translateY(1px);
}
`;
