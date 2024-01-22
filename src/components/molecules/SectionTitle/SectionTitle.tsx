import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "reduxStore/Hook";
import { HitOverlay, StatusBar } from "components/atoms";
import Styles from './SectionTitle.module.scss';
import { addTotalDamage } from "reduxStore/statSlice";

const SectionTitle = (props: {title: string, onClickHandler: ()=> void}) => {
  const [ titleState      , setTitleState       ] = useState({level: 1, maxHealth: 75, regen: false, healing: false, range: 100})
  const [ overLayState    , setOverLayState     ] = useState({ clicked: false, top: '', left: 0, value: 0, critical: false});
  const [ indicatorVisible, setIndicatorVisible ] = useState(false);

  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const level      = useAppSelector((state) => state.statReducer.level);
  const titleRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '300px 0px 300px 0px',
      threshold: 1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], _observer: IntersectionObserver) => {
      entries.forEach(entry => {
        setIndicatorVisible(entry.isIntersecting);
      });
    };

    const indicatorObserver = new IntersectionObserver(handleIntersection, options);

    if (titleRef.current) {
      indicatorObserver.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        indicatorObserver.unobserve(titleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (titleState.regen && !titleState.healing) {
      const interval = setInterval(() => {
        setTitleState((prev) => {
          if (prev.range + 5 >= 100) {
            clearInterval(interval);

            return {...prev, range: 100, healing: false, regen: false};
          } else {

            return {...prev, range: prev.range + 5 > 100 ? 100 : prev.range + 5, healing: true};
          }
        });
      }, 40);
    } else if (titleState.range !== 100 && !titleState.healing) {
      const interval = setInterval(() => {
        setTitleState((prev) => {
          if (prev.range + 0.2 >= 100) {
            clearInterval(interval);

            return {...prev, range: 100, healing: false};
          } else {

            return {...prev, range: prev.range + 0.2 > 100 ? 100 : prev.range + 0.2, healing: true};
          }
        });
      }, 40);
    }

  }, [titleState])

  const handleSpanClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (titleState.range > 0 && !overLayState.clicked && !titleState.regen) {
      const { pageX, pageY, currentTarget  } = event;
      const targetElement = currentTarget ;

      const sectionRect = targetElement.parentElement!.getBoundingClientRect();
      const relativeX = pageX;
      const relativeY = `calc(${pageY} - ${sectionRect?.top} + ${props.title === 'INTRO' ? 0 : 1 } * 100vh)`;

      const critical   = Math.floor(Math.random() * (100 - 1 + level * 3)) + 1 < Math.random() * (2 * level) + 10;
      let randomNumber = Math.floor(Math.random() * (10 - 1) + (level * 3 )) + Math.floor(2 + (level * 3 ));

      if (critical) {
        randomNumber = randomNumber * 2;
      }

      const titleHealth = Math.floor((1 + (titleState.level)) * 25);
      const currHealth = titleHealth * titleState.range / 100;
      const titleHealthe = (currHealth - randomNumber) > 0 ? currHealth - randomNumber : 0;

      const newRange =  (titleHealthe / titleHealth) * 100;

      if (newRange === 0) {
        setOverLayState({clicked: true, top: relativeY, left: relativeX, value: randomNumber, critical: critical});
        setTitleState(prev => {return {...prev, level: prev.level + 1, regen: true, healing: false, range: 0, maxHealth: titleHealth}})
        setTimeout(()=>{
          setOverLayState(prev => {return {...prev, clicked: false, critical: false}})

        }, 1000)
      } else {
        setOverLayState({clicked: true, top: relativeY, left: relativeX, value: randomNumber, critical: critical});
        setTitleState(prev => {return {...prev, range: newRange}})
        setTimeout(()=>{
          setOverLayState(prev => {return {...prev, clicked: false, critical: false}})

        }, 1000)
      }

      dispatch(addTotalDamage(randomNumber))
      props.onClickHandler()
    }
  };

  const charArray = props.title.split('');

  return (
    <div className={`${Styles.title} ${Styles['title--theme-' + themeColor]} `}>
      <div className={Styles.title__content}>
        <HitOverlay
          overLayState = {overLayState}
        />
        <div className={Styles.title__content__message}>
          <div ref={titleRef}>
            {charArray.map((char, index) => {
              return (
                <span key={index} onClick={handleSpanClick} className={`${titleState.range !== 100 ? Styles['title__span-clicked'] : Styles['title__span']}`}>{char}</span>
              )
            })}
            <div className={`${Styles.title__content__indicator}`}>
              {(indicatorVisible && overLayState.value === 0) && <span className={Styles.indicator}>👈hit me</span>}
            </div>
          </div>
          <div className={`${Styles.title__content__level} ${overLayState.critical && Styles.shake}`}>{`level : ${titleState.level}, HP : ${Math.floor(titleState.range * titleState.maxHealth / 100)} / ${titleState.maxHealth}`}</div>
        </div>
        <StatusBar rangeValue={titleState.range} parent={props.title}/>
      </div>
    </div>
  )
}

export default SectionTitle;
