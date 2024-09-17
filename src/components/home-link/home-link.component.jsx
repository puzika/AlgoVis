import HomeIcon from '../../assets/home.svg';
import * as S from './home-link.styles';

export default function HomeLink() {
   return (
      <S.HomeLink to={'/'}>
         <S.HomeImage src={HomeIcon} />
      </S.HomeLink>
   )
}