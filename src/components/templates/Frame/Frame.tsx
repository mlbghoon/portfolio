import { useState } from 'react';
import { useAppSelector } from 'reduxStore/Hook';
import { ThemeColor } from 'components/molecules';
import Styles from './Frame.module.scss';
import { Language, Menu, StatOverlay } from 'components/atoms';
import { useNavigate } from 'react-router-dom';
import MenuIcon from 'assets/images/icons/menu/menu.svg';

const Frame = ({ children }: any) => {
  // const navigate = useNavigate();
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const name = useAppSelector((state) => state.characterReducer.name);
  // const [ active, setActive ] = useState('About');
  // const [ open  , setOpen   ] = useState(false);
  // const menuList = [
  //   'About', 'Showcase', 'Skills', 'Resume'
  // ]
  // const manuChangeHandler = (value: string) => {
  //   setActive(value);
  //   setOpen(false)
  //   navigate('/'+value);
  // }
  return (
    <div className={`${Styles.frame} ${Styles['frame-' + themeColor]}`}>
      <div className={Styles.frame__header}>
        <div className={Styles['frame__theme-control']}>
          <ThemeColor/>
        </div>
        <div className={Styles['frame__language-control']}>
          <Language/>
        </div>

        {/* <div className={Styles.frame__menu}>
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
          <div className={Styles.frame__menu__button} onClick={() => {setOpen(true)}}>
            <MenuIcon/>
          </div>
        </div>
        <div className={`${Styles.menu__overlay} ${open && Styles['menu__overlay-open']}`}>
          {open && <div className={Styles.menu__overlay__close} onClick={() => {setOpen(false)}}>X</div>}
          {open &&
            <div className={Styles.menu__overlay__container}>
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
        </div> */}
      </div>
      <div className={Styles.frame__contents}>
        {children}
      </div>
      {name !== '' ? <StatOverlay/> : null}
    </div>
  )
}

export { Frame };
