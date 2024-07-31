import * as S from './sorting.styles';
import Button, { ButtonTypes } from '../../components/button/button.component';

export default function Sorting() {
   return (
      <>
         <S.ToolBar>
            <Button text={'Something'} styleType={ButtonTypes.transparent} />
         </S.ToolBar>
      </>
   )
}