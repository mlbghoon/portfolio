import Explosion from 'assets/images/icons/etc/Explosion.svg';
import Styles from './HitOverlay.module.scss';

type HitOverlayProps = {
  overLayState: {
    clicked: boolean;
    top    : string;
    left   : number;
    value  : number;
    critical: boolean;
  }
};

const HitOverlay = ({overLayState}: HitOverlayProps) => {
  const { clicked, top, left, value, critical } = overLayState;
  return (
    <div>
      {clicked && (
        <div className={`${Styles['overlay__container']} ${critical && Styles['overlay__container-critical']}`} style={{ top, left}}>
          <Explosion/> {critical ? `CRITICAL!! ${value}` : value}
        </div>
      )}
    </div>
  );
};

export { HitOverlay };