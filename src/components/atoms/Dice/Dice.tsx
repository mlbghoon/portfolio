import { useAppSelector } from 'reduxStore/Hook';
import Styles from './Dice.module.scss';

const diceFace = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

type diceProp = {
  clicked: boolean;
  facing : number | null
}
const Dice = ({clicked, facing} : diceProp) => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);

  return (
    <div className={`${Styles.die} ${clicked ? Styles.rolling : ''} ${Styles['die-' + themeColor]}`} data-face={facing}>
      {diceFace.map((face, key) => {
        return (
          <figure key={key} className={`${Styles.face} ${Styles['face-' + face]} ${facing === face ? Styles.active : ''}`}></figure>
        )
      })}
    </div>
  )
}
export { Dice };