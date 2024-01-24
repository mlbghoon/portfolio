import styles from './ThemeColor.module.scss';
import { Button } from 'components/atoms';
import { useAppDispatch, useAppSelector } from 'reduxStore/Hook';
import { setThemeColor } from 'reduxStore/themeSlice';


const ThemeColor = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const HeaderThemeList = [
    {
      id    : 1,
      color : 'red',
    },
    {
      id    : 2,
      color : 'blue',
    },
    {
      id    : 3,
      color : 'green',
    },
    {
      id    : 4,
      color : 'gray',
    },
  ];
  return (
    <div className={styles.theme}>
      {HeaderThemeList.map((theme, index) =>
        <div className={`${styles[`theme--${theme.color}`]} ` } key={index}>
          <button className={`${styles.theme__button} ${themeColor === theme.color ? styles['theme__button-selected'] : ''}`} value={''} onClick={() => dispatch(setThemeColor(theme.color))} key={theme.id} />
        </div>
      )}
    </div>
  )
}

export default ThemeColor;