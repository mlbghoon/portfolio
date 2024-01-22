import { useMemo } from 'react';
import { useAppSelector } from 'reduxStore/Hook';
import { DateLib } from 'utils';
import { Section } from 'components/organism';
import Styles from './about.module.scss'
import { Follower, StatOverlay, TypingText } from 'components/atoms'
import { Infos } from 'components/molecules';


function AboutPage() {
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


  return (
    <div className={`${Styles.wrapper} ${Styles['wrapper-' + themeColor]}`}>
      <Follower/>
      <div className={Styles.about}  >
        <Section title='INTRO'>
          <TypingText
            text ={`안녕하세요.\n개발이 너무 재밋는 [][] 차\nFront-end React Developer 입니다.`}
            variableArr ={[career]}
          />
        </Section>
        <Section title='INFOS'>
          <div className={Styles.infos__contents}>
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
        </Section>
        <Section title='Test'>
          <div className={Styles.infos__contents}>

          </div>
        </Section>
        <Section title='Test2'>
          <div className={Styles.infos__contents}>

          </div>
        </Section>
      </div>
    </div>
  );
}

export default AboutPage;
