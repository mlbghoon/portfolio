import { useSelector } from 'react-redux';
import { IconImage } from '../IconImage/IconImage';
import styles from './Button.module.scss';

import { useAppSelector } from 'reduxStore/Hook';


interface button_props_type {
  name?  : string;
	image? : string;
	value? : string;
	type?   : 'defulat' | 'arrow';
	size?   : 'small' | 'medium' | 'big';
  color?  : 'default' | 'default-light' | 'default-dark' | 'medium' | 'medium-light' | 'medium-dark' | 'deep' | 'deep-light' | 'deep-dark';
  ext?    : string;
  active? : boolean;
  disabled?: boolean;
	onClickEvent : (name: string | undefined) => void;
}


const Button = (props: button_props_type) => {
  const { name, value, image, onClickEvent, type='default', size='medium', active=false, color='default'} = props;
  const { disabled = false, ext = '' } = props;
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor)
  const classNames = `${styles.btn} ${styles[`btn--${themeColor}-${color}`]} ${styles[`btn--type-${size}`]} ${(type === 'arrow' && active) && styles['btn--type-arrow-active']} ${ext}`

  const onClickEventHandler = (e: any) => {
    e.target.blur();
    onClickEvent && onClickEvent(name);
  }
  return (
    <button
      id       = {name}
      onClick  = {onClickEventHandler}
      disabled = {disabled}
      className= {classNames}
    >
      {image
        && <IconImage icon={image}/>
      }
      {value && value}
      {(type === 'arrow') && <i></i>}
    </button>
  )
}

export { Button };