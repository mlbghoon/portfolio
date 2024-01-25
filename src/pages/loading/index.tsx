import { useEffect, useState, useCallback, ChangeEvent, useRef  } from 'react';
import { useAppSelector } from 'reduxStore/Hook';
import { DelayView, StatusBar, Spans, Menu } from 'components/atoms'

import { ThemeColor } from 'components/molecules';
import { Language } from 'components/atoms';
import Styles from './loading.module.scss';
import { useNavigate } from 'react-router-dom';
import { Background } from 'components/templates';

type EnteranceProps= {
  language: string;
}

const Enterance = ({language}:EnteranceProps) => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const [ choice    , setChoice     ]  = useState('Start');
  const [ transition, setTransition ]  = useState(0);
  const [ title     , setTitle     ]   = useState(<></>);
  const navigate = useNavigate();


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setChoice('Start');
      } else if (event.key === 'ArrowDown') {
        setChoice('Continue');
      } else if (event.key === 'Enter') {
        pageChange();
      }
    };

    document.addEventListener('keyup', handleKeyDown);
    makeTitle();

    return () => {
      document.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  const pageChange = (page?: string) => {
    let newPage = '/';
    if (page) {
      newPage += page;

    } else {
      newPage += choice;

    }

    setTimeout(() => {navigate(newPage);}, 1000)
    setTransition(1);
  }

  const makeTitle = () => {
    setTitle(
      language === 'Kor'
        ? <>
            <div>
              <Spans value={`권세훈의`}/>
            </div>
            <div>
              <Spans value={`포트폴리오`}/>
            </div>
          </>
        : <>
            <div>
              <Spans value={`Sehoon's`}/>
            </div>
            <div>
              <Spans value={`portfolio`}/>
            </div>
          </>
    )
  }

  return (
    <div className={`${Styles.loaded__enterance} ${Styles['loaded__enterance-'+themeColor]} ${transition === 1 ? Styles['loaded__enterance-closing'] : ''}`}>
      <div className={Styles.loaded__enterance__title}>
        {title}
      </div>
      {transition === 0
        ? <>
            <Menu
              color={themeColor}
              value={language === 'Kor' ? '시작하기' : 'Start'}
              active = {choice === 'Start'}
              onClick={()=> {pageChange('Start')}}
            />
            <Menu
              color={themeColor}
              value={language === 'Kor' ? '이어보기' : 'Continue'}
              active = {choice === 'Continue'}
              onClick={()=> {pageChange('Continue')}}
            />
          </>
        : null
      }
    </div>
  )
}
// const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//   let x = e.clientX;
//   let y = e.clientY;
//   let mx = e.movementX;
//   let my = e.movementY;
//   const angle = Math.atan2(e.movementY, e.movementX) * (180 / Math.PI);

//   if (mx > 0) {
//     x -= 20;
//   } else if (mx < 0) {
//     x += 20;

//   }
//   if (my > 0) {
//     y -= 20;

//   } else if (my < 0) {
//     y += 20;

//   }
//   document.documentElement.style.setProperty(`--follower-location`, `translate(${x}px, ${y}px) rotate(${angle}deg)`);
// }

function LoadingPage() {
  const language = useAppSelector((state) => state.languageReducer.language);
  const [ range, setRange ] = useState(0);

  useEffect(()=> {
    const interval = setInterval(() => {
      setRange((prev) => {
        if (prev + 5 >= 100) {
          clearInterval(interval);
          return 100;
        } else {
          return prev + 5;
        }
      });
    }, 40);
  }, []);

  const setLoadingText = () => {
    let text = language === 'Kor' ? 'div 끼워 넣는 중...' : 'Inserting Div...';
    if (range > 80) {
      text = language === 'Kor' ? 'scss 줄맞춤 시키는 중...' : 'Lining up scss...';
    } else if (range > 60) {
      text = language === 'Kor' ? 'states 교육 중...'        : 'Educating States...';
    } else if (range > 40) {
      text = language === 'Kor' ? '버그 몰아내는 중...'      : 'Driving out Bugs...';
    } else if (range > 20) {
      text = language === 'Kor' ? 'redux 작전 회의 중...'    : 'Redux strategy meeting..';
    }
    return text;
  }
  return (
    <>
      <Background/>
      <div className={`${Styles.loading__wrapper}`}>
        <div className={Styles['loading__theme-control']}><ThemeColor/></div>
        <div className={Styles['loading__language-control']}><Language/></div>
        <div className={`${Styles.loading} ${range === 100 ? Styles.loading__none : ''}`} >
          <div className={`${Styles.loading__text}`}>
            {range === 100
              ? null
              : setLoadingText()
            }
          </div>
          <StatusBar rangeValue={range} parent={'loading'}/>
        </div>
        <div className={`${Styles.loaded} ${range === 100 ? Styles['loaded__display'] : ''}`} >
          {range === 100
            ? <DelayView delay={1000}>
                <Enterance language={language}/>
              </DelayView>
            : null
          }
        </div>
      </div>
    </>
  );
}

export default LoadingPage;
