import styles from './Menu.module.scss';

type MenuProps = {
  value    : string;
  active   : boolean;
  color    : string;
  onClick  : (value: string) => void;
}
const Menu = (props: MenuProps) => {
  return (
    <div className={`${styles.menu} ${props.active ? styles['menu-active'] : ''} ${styles['menu-'+props.color]} `} onClick={() => props.onClick(props.value)}>
      {props.value}
      <div className={`${styles.menu__selectionbar} ${props.active && styles['menu__selectionbar-active']}`}/>
    </div>
  )
}
export { Menu }