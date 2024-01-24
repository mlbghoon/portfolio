import { useEffect, useState } from 'react';
import Styles from './DelayView.module.scss';

type DelayViewProps = {
  children: React.ReactNode;
  delay   : number;
};

const DelayView = ({children, delay}: DelayViewProps) => {
  const [ visible, setVisivle] = useState(false);

  useEffect(() => {
    setVisivle(false)
    setTimeout(()=> {
      setVisivle(true)
    }, delay)
  }, [children, delay])

  return (
    <div className={`${Styles.view} ${visible ? Styles['view-visible'] : ''}`}>
      {visible ? children : null}
    </div>
  )
}

export { DelayView };