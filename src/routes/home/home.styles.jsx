import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Home = styled.div`
   position: relative;
   width: 100%; 
   height: 100vh;
   overflow: hidden; 
`;

export const HomeContent = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   translate: -50% -50%;
   display: flex;
   flex-direction: column;
   gap: 4rem;
`;

export const HomeHeading = styled.h1`
   font-size: 12.5rem;
`;

export const HomeDescription = styled.p`
   font-size: 2rem;
`;

export const HomeNavList = styled.ul`
   list-style: none;
   display: flex;
   justify-content: center;
   gap: 5rem;
`;

export const HomeNavLink = styled(Link)`
   display: block;
   width: 20rem;
   text-align: center;
   font-size: 2rem;
`;

export const HomeNavImg = styled.img`
   width: 100%;
   height: 20rem;
   margin-bottom: 2rem;
`;