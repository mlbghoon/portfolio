import { useEffect, useState } from 'react';
import Styles from './StatOverlay.module.scss';
import { useAppSelector } from 'reduxStore/Hook';

const StatOverlay = () => {
  const level = useAppSelector((state) => state.statReducer.level);
  const totalDamage = useAppSelector((state) => state.statReducer.totalDamage);
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const [ levelUp, setLevelUp ] = useState(false)
  useEffect(() => {
    setLevelUp(true);
    setTimeout(()=> {setLevelUp(false)}, 5000)
  }, [level])
  return (
    <div className={`${Styles.ovelay} ${Styles['ovelay-' + themeColor]} ${levelUp && Styles['ovelay-levelUp']}`}>
      <div className={Styles.stat}>
        <div>{`level : ${level}`}</div>
        <div>{`minDamage : ${Math.floor(2 + (level * 3))}`}</div>
        <div>{`maxDamage : ${Math.floor(9 + (level * 3)) + Math.floor(2 + (level * 3))}`}</div>
        <div>{`totalDamage : ${totalDamage}`}</div>
      </div>
    </div>
  );
};

export { StatOverlay };