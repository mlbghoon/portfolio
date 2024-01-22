import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'reduxStore/Hook';
import { DateLib } from 'utils';
import { Frame } from 'components/templates';
import { Button, IconImage} from 'components/atoms';
import { Infos } from 'components/molecules';
import { ThemeColor } from 'components/molecules';
import Styles from './welcome.module.scss'
// import { DateLib } from 'common/script';
// import { useMemo } from 'react';
// import { setCurrnetPage } from 'reduxStore/pageSlice';

function WelcomePage() {
  const navigate = useNavigate();
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);

  const career = useMemo(() => {
    return String(DateLib.getDiffDateFull('20191001', DateLib.getToday()));
  }, []);

  const infos = [
    { icon: 'PERSON'  , label: '이름'    , value: '권세훈'             },
    { icon: 'CALENDAR', label: '생년월일', value: '1987-02-14'         },
    { icon: 'HOME'    , label: '주소지'  , value: '서울 강동구'        },
    { icon: 'PHONE'   , label: '연락처'  , value: '010-6548-7667'      },
    { icon: 'EMAIL'   , label: '이메일'  , value: 'mlbg_hoon@naver.com'},
    { icon: 'HISTORY' , label: '경력'    , value: career               }
  ]

  const handleButtonClick = () => {
    navigate('/pageOne');
  };

  return (
    <>
      <div className={`${Styles.wrapper} ${Styles['wrapper-' + themeColor]}`}>
        <div className={`${Styles.section} ${Styles['section-left']}`}>
          <div className={Styles.section__banner}>
            <IconImage icon={"WELCOME"} />
          </div>
          <div className={Styles.section__aboutme}>
            <div className={Styles.section__title}>
              <div className={Styles.section__title__text}>
                ABOUT ME
              </div>
            </div>
            <div className={Styles.aboutme__contents}>
              {infos.map((info, key) => {
                return (
                  <Infos
                    key   = {key}
                    icon  = {info.icon}
                    label = {info.label}
                    value = {info.value}
                    color = {themeColor}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.wrapper} ${Styles['wrapper-' + themeColor]}`}>
        <div className={`${Styles.section} ${Styles['section-right']}`}>
          <div className={Styles.section__message}>
            <div className={Styles.section__title}>
              <div className={Styles.section__title__text}>
                권세훈
              </div>
            </div>
            <div className={Styles.message__contents}>
              안녕하세요.
              <br/>
              개발이 너무 재밋는 {career}차
              <br/>
              리엑트 개발자 입니다.
            </div>
            <Button
              value='둘러보기'
              onClickEvent={handleButtonClick}
              color= 'default-dark'
            />
            <div className={Styles.section__link}>
              github 경로 링크
            </div>
          </div>
          <ThemeColor/>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
