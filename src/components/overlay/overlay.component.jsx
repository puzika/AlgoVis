import * as S from './overlay.styles';

export default function Overlay({isRunning}) {
   return <S.Overlay style={{display: isRunning ? 'block' : 'none'}} />
}