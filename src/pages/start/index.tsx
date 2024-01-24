import { useEffect, useMemo, useState       } from 'react';
import { useAppSelector } from 'reduxStore/Hook';
import { DelayView, Input, TypingText          } from 'components/atoms'
import Styles from './start.module.scss';
import { DateLib } from 'utils';
import { finished } from 'stream';

const diceFace = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const Dice = () => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const [ clicked, setClicked ] = useState(false);
  const [ facing , setFacing  ] = useState<number | null>(null);
  const roll = () => {
    setClicked(true)

    setTimeout(function () {
      setClicked(false)

      setFacing(Math.floor((Math.random() * 20)) + 1)
    }, 3000)
  }

  return (
    <div className={Styles.content} onClick={roll}>
      <div className={`${Styles.die} ${clicked ? Styles.rolling : ''} ${Styles['die-' + themeColor]}`} data-face={facing}>
        {diceFace.map((face, key) => {
          return (
            <figure key={key} className={`${Styles.face} ${Styles['face-' + face]} ${facing === face ? Styles.active : ''}`}></figure>
          )
        })}
      </div>
    </div>
  )
}

type textType = {
  [key: string]: string;
}
const textArr: textType[] = [
  {
    'Kor': `안녕하세요.\n개발이 너무 재밋는 [][] 차\n 프런트엔드 리엑트 개발자 입니다.`,
    'Eng': `Hello.\nI am a 4-year experienced\nfrontend React developer\nwho finds development very enjoyable.`
  },
  {
    'Kor': `포트폴리오를 게임처럼 만들어 보았습니다.`,
    'Eng': `I made my portfolio like a game.`
  },
  {
    'Kor': `시작하기 앞서 캐릭터 생성을 하겠습니다.`,
    'Eng': `Before we begin, let's create a character.`
  },
]

type NpcProps = {
  index: number;
  language: string;
  renderDone: () => void
}
const Npc = ({index, language, renderDone}: NpcProps) => {
  const career = useMemo(() => {
    return String(DateLib.getDiffDateFull('20191001', DateLib.getToday()));
  }, []);

  const makeTyping = () => {
    switch(index) {
      case 0:
        return (
          <>
            <div className={Styles['start__npc-tri']}>
              <div></div>
            </div>
            <div className={Styles['start__npc-sqa']}>
              <TypingText
                text ={textArr[0][language]}
                variableArr ={[career]}
                finishRenderHandler={renderDone}
              />
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className={Styles['start__npc-tri']}>
              <div></div>
            </div>
            <div className={Styles['start__npc-sqa']}>
              <TypingText
                text ={textArr[1][language]}
                finishRenderHandler={renderDone}
              />
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className={Styles['start__npc-tri']}>
              <div></div>
            </div>
            <div className={Styles['start__npc-sqa']}>
              <TypingText
                text ={textArr[2][language]}
              />
            </div>
          </>
        )
      default:
        return <></>
    }
  }
  return (
    <>
      {makeTyping()}
    </>
  )
}

const Conv = () => {
  const language   = useAppSelector((state) => state.languageReducer.language);
  const [ index, setIndex ] = useState(0);
  const renderDone = () =>{
    setIndex(prev => prev + 1)
  }

  return (
    <>
      <div className={Styles.start__npc}>
        <Npc index={index} language={language} renderDone={renderDone}/>
      </div>
      <div className={Styles.start__contents}>

      </div>
      <div className={Styles.start__user}>
        <div className={Styles['start__user-sqa']}>

        </div>
        <div className={Styles['start__user-tri']}>
          <div></div>
        </div>
      </div>
    </>
  )
}
const Start = () => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const [ usrNm, setUsrNm ] = useState('');


  return (
    <DelayView delay={1000}>
      <div className={`${Styles.start} ${Styles['start-'+themeColor]}`}>
        <Conv/>

        {/* <Dice/>
        <div className={Styles.userForm__line}>
          <div>캐릭터명</div>
          <Input
            id={'iptUsrName'}
            name={'usrNm'}
            value={usrNm}
            onChange={(name,value) => {setUsrNm(value)}}
          />
        </div> */}
      </div>
    </DelayView>
  )
}


export default Start;
