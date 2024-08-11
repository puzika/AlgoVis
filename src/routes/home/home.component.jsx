import * as S from './home.styles';
import * as svar from '../../variables.styles';
import NetworkAnimation from '../../components/network-animation/network-animation.component';
import sortingImg from '../../assets/sorting.svg';
import pathfindingImg from '../../assets/pathfinding.svg';

export default function Home() {
   return (
      <S.Home>
         <NetworkAnimation></NetworkAnimation>
         <S.HomeContent>
            <S.HomeHeading>
               <span style={{color: svar.colorPrimary}}>Algo</span>
               <span>Vis</span>
            </S.HomeHeading>
            <S.HomeDescription>Interactive online platform for algorithm visualization</S.HomeDescription>
            <nav>
               <S.HomeNavList>
                  <li>
                     <S.HomeNavLink to={'/sorting'}>
                        <S.HomeNavImg src={sortingImg} />
                        <p>Sorting</p>
                     </S.HomeNavLink>
                  </li>
                  <li>
                     <S.HomeNavLink to={'/pathfinding'}>
                        <S.HomeNavImg src={pathfindingImg} />
                        <p>Pathfinding</p>
                     </S.HomeNavLink>
                  </li>
               </S.HomeNavList>
            </nav>
         </S.HomeContent>
      </S.Home>
   )
}