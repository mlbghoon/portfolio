import { useState } from 'react';
import { useAppSelector } from 'reduxStore/Hook';
import { ThemeColor } from 'components/molecules';
import styles from './Frame.module.scss';
import { Menu, StatOverlay } from 'components/atoms';
import { useNavigate } from 'react-router-dom';
import MenuIcon from 'assets/images/icons/menu/menu.svg';

const Frame = ({ children }: any) => {
  const navigate = useNavigate();
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const [ active, setActive ] = useState('About');
  const [ open  , setOpen   ] = useState(false);
  const menuList = [
    'About', 'Showcase', 'Skills', 'Resume'
  ]
  const manuChangeHandler = (value: string) => {
    setActive(value);
    setOpen(false)
    navigate('/'+value);
  }
  return (
    <div className={`${styles.frame} ${styles['frame-' + themeColor]}`}>
      <div className={styles.frame__header}>
        <div className={styles['frame__theme-control']}>
          <ThemeColor/>
        </div>
        <div className={styles.frame__menu}>
          {menuList.map((menu, key) => {
            return (
              <Menu
                key={key}
                color={themeColor}
                value={menu}
                active = {active === menu}
                onClick={manuChangeHandler}
              />
            )
          })}
          <div className={styles.frame__menu__button} onClick={() => {setOpen(true)}}>
            <MenuIcon/>
          </div>
        </div>
        <div className={`${styles.menu__overlay} ${open && styles['menu__overlay-open']}`}>
          {open && <div className={styles.menu__overlay__close} onClick={() => {setOpen(false)}}>X</div>}
          {open &&
            <div className={styles.menu__overlay__container}>
              {menuList.map((menu, key) => {
                return (
                  <Menu
                    key={key}
                    color={themeColor}
                    value={menu}
                    active = {active === menu}
                    onClick={manuChangeHandler}
                  />
                )
              })}
            </div>
          }
        </div>
      </div>
      <div className={styles.frame__contents}>
          {children}
      </div>
      <StatOverlay/>
    </div>
  )
}

export { Frame };
