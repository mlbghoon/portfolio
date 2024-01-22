import { DynamicSvg } from 'components/atoms/DynamicSvg/DynamicSvg';
import Styles from './Infos.module.scss';
import { useMemo } from 'react';


const Infos = (props: {icon: string, label: string, value: string, color: string}) => {
  const classNames = useMemo(() => {
    return `${Styles.about} ${Styles['about--' + props.color]}`;
  }, [props.color])

  return (
    <div className={classNames}>
      <div className={Styles.about__icon}>
        <DynamicSvg svg={props.icon} />
      </div>
      <div className={Styles.about__field}>
        <div className={Styles['about__field-label']}>
          {props.label}
        </div>
        <div className={Styles['about__field-value']}>
          {props.value}
        </div>
      </div>
    </div>
  )
}


export default Infos;