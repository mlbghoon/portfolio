
import { useEffect } from 'react';
import Styles from './StatusBar.module.scss';
import { useAppSelector } from 'reduxStore/Hook';

type StatusBarProps = {
  rangeValue: number;
  parent: string;
}

const StatusBar = ({rangeValue, parent}: StatusBarProps) => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);

  useEffect(() => {
    const greenPercentage = Math.min(rangeValue, 100);
    const redPercentage = Math.max(100 - greenPercentage, 0);
    document.documentElement.style.setProperty(`--${parent.toLowerCase()}-gradient-start`, `${greenPercentage}%`);
    document.documentElement.style.setProperty(`--${parent.toLowerCase()}-gradient-end`, `${redPercentage}%`);

    return () => {
      document.documentElement.style.removeProperty(`--${parent.toLowerCase()}-gradient-start`);
      document.documentElement.style.removeProperty(`--${parent.toLowerCase()}-gradient-end`);
    };
  }, [rangeValue, parent]);

  return (
    <div
      className={`${Styles.hpbar} ${Styles['hpbar__' + parent.toLowerCase() + '-' + themeColor]} `}
    />
  );
};
export { StatusBar };