import { useState } from 'react';
import Styles from './Dices.module.scss';
import { Button, Dice } from 'components/atoms';
import { useAppSelector } from 'reduxStore/Hook';

const Dices = () => {
  const language   = useAppSelector((state) => state.languageReducer.language);

  const [ clickedOne  , setClickedOne   ] = useState(false);
  const [ clickedTwo  , setClickedTwo   ] = useState(false);
  const [ clickedThree, setClickedThree ] = useState(false);
  const [ facingOne   , setFacingOne   ] = useState<number | null>(null);
  const [ facingTwo   , setFacingTwo   ] = useState<number | null>(null);
  const [ facingThree , setFacingThree ] = useState<number | null>(null);

  const roll = (index: number) => {
    switch (index) {
      case 0:
        setClickedOne(true)

        setTimeout(function () {
          setClickedOne(false)
          setFacingOne(Math.floor((Math.random() * 20)) + 1)
        }, 3000)

        break;
      case 1:
        setClickedTwo(true)

        setTimeout(function () {
          setClickedTwo(false)
          setFacingTwo(Math.floor((Math.random() * 20)) + 1)
        }, 3000)
        break;
      default:
        setClickedThree(true)

        setTimeout(function () {
          setClickedThree(false)
          setFacingThree(Math.floor((Math.random() * 20)) + 1)
        }, 3000)
        break;
    }
  }
  const rollAll = () => {
    setClickedOne(true)
    setClickedTwo(true)
    setClickedThree(true)

    setTimeout(function () {
      setClickedOne(false)
      setClickedTwo(false)
      setClickedThree(false)

      setFacingOne(Math.floor((Math.random() * 20)) + 1)
      setFacingTwo(Math.floor((Math.random() * 20)) + 1)
      setFacingThree(Math.floor((Math.random() * 20)) + 1)
    }, 3000)
  }
  const confirmStat = () => {

  }
  return (
    <>
      <div className={Styles['dices-wrapper']}>
        <div className={Styles['dice-wrapper']}>
          <div className={Styles['dice-content']} onClick={() => roll(0)}>
            <Dice 
              clicked={clickedOne} 
              facing={facingOne}            
            />
          </div>
          <div className={Styles['dice-label']}>{language === 'Kor' ? '공격' : 'Attack'}</div>
        </div>
        <div className={Styles['dice-wrapper']}>
          <div className={Styles['dice-content']} onClick={() => roll(1)}>
            <Dice 
              clicked={clickedTwo} 
              facing={facingTwo}            
            />
          </div>
          <div className={Styles['dice-label']}>{language === 'Kor' ? '속도' : 'Speed'}</div>
        </div>
        <div className={Styles['dice-wrapper']}>
          <div className={Styles['dice-content']} onClick={() => roll(2)}>
            <Dice 
              clicked={clickedThree} 
              facing={facingThree}            
            />
          </div>
          <div className={Styles['dice-label']}>{language === 'Kor' ? '크리티컬' : 'Critical'}</div>
        </div>
      </div>
      <div>
        <Button 
          onClickEvent={rollAll}
          value={language === 'Kor' ? '모두 굴리기' : 'Roll All'}
        />
        <Button 
          onClickEvent={confirmStat}
          value={language === 'Kor' ? '확정' : 'Critical'}
        />
      </div>
    </>
  )
}
export default Dices;