import { useAppSelector } from 'reduxStore/Hook';
import Styles from './Follower.module.scss';
import { useEffect, useState } from 'react';

const Follower = () => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const totalDamage = useAppSelector((state) => state.statReducer.totalDamage);
  const [ charged, setCharged ] = useState(false)

  useEffect(() => {
    setCharged(false);
    setTimeout(()=>{setCharged(true)}, 500)
  }, [totalDamage])

  return (
    <div className={`${Styles.follower} ${charged && Styles['follower-ready']} ${Styles['follower-' + themeColor]}`}>

    </div>
  )
}

export { Follower };