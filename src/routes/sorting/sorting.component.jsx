import * as S from './sorting.styles';
import Button, { ButtonTypes } from '../../components/button/button.component';
import Dropdown from '../../components/dropdown/dropdown.component';

export default function Sorting() {
   return (
      <>
         <S.ToolBar>
            <Button text={'Generate array'} styleType={ButtonTypes.filled} />
            <Dropdown name={'Algorithms'}>

            </Dropdown>
            <Button text={'Sort'} styleType={ButtonTypes.transparent} />
         </S.ToolBar>
      </>
   )
}