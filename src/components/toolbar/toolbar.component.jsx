import * as S from './toolbar.styles';

export default function Toolbar({children, vertical}) {
   const styles = vertical ? {
      flexDirection: 'column',
      gap: '2rem',
   } : {};

   return (
      <S.ToolBar style={styles}>
         {children}
      </S.ToolBar>
   )
}