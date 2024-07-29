import * as S from './home.styles';
import NetworkAnimation from '../../components/network-animation/network-animation.component';

export default function Home() {
   return (
      <S.Home>
         <NetworkAnimation></NetworkAnimation>
         <S.HomeContent></S.HomeContent>
      </S.Home>
   )
}