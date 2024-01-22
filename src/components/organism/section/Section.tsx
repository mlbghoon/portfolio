import { SectionTitle } from 'components/molecules';
import { MouseEventHandler, MouseEvent as ReactMouseEvent } from 'react';
import Styles from './Section.module.scss';

type SectionProps = {
  children: React.ReactNode;
  title   : string;

};

const Section = ({children, title}: SectionProps) => {
  const handleChildClick : MouseEventHandler<HTMLElement> = (e) => {
    const targetOffsetTop = e.currentTarget.offsetTop;
    const parent = e.currentTarget.parentElement!.parentElement;
    const currentScrollTop = parent!.scrollTop;

    const distanceToScroll = targetOffsetTop - currentScrollTop;

    const duration = 200;
    const framesPerSecond = 60;
    const increment = distanceToScroll / (duration / 1000 * framesPerSecond);

    const animateScroll = () => {
      if (Math.abs(parent!.scrollTop - targetOffsetTop) <= Math.abs(increment)) {
        parent!.scrollTop = targetOffsetTop;
      } else {
        parent!.scrollTop += increment;

        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  };

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    let x = e.clientX;
    let y = e.clientY;
    let mx = e.movementX;
    let my = e.movementY;
    const angle = Math.atan2(e.movementY, e.movementX) * (180 / Math.PI);

    if (mx > 0) {
      x -= 20;
    } else if (mx < 0) {
      x += 20;

    }
    if (my > 0) {
      y -= 20;

    } else if (my < 0) {
      y += 20;

    }
    document.documentElement.style.setProperty(`--follower-location`, `translate(${x}px, ${y}px) rotate(${angle}deg)`);
  }
  return (
    <>
      <section  className={Styles.section} onClick={handleChildClick} onMouseMove={onMouseMove}>
        <SectionTitle title={title} onClickHandler={() => {}}/>
        {children}
      </section>
    </>
  )
}

export { Section };
