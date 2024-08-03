import { Link } from 'react-router-dom';
import HomeIcon from '../../assets/home.svg';
import * as S from './toolbar.styles';

export default function Toolbar({children}) {
   return (
      <S.ToolBar>
         <Link to={'/'}><S.Img src={HomeIcon} /></Link>
         {children}
      </S.ToolBar>
   )
}