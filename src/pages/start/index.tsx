import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'reduxStore/Hook';
import { Button, DelayView, Dice, Input, TypingText } from 'components/atoms'
import Styles from './start.module.scss';
import { DateLib, StrLib } from 'utils';
import { characterState, setName } from 'reduxStore/characterSlice';
import { Dices } from 'components/molecules';


type textType = {
  [key: string]: string;
}
const textArr: textType[] = [
  {
    'Kor': `안녕하세요.\n개발이 너무 재밋는 [][] 차 프런트엔드 리엑트 개발자 입니다.`,
    'Eng': `Hello.\nI am a 4-year experienced frontend React developer who finds development very enjoyable.`
  },
  {
    'Kor': `포트폴리오를 게임처럼 만들어 보았습니다.`,
    'Eng': `I made my portfolio like a game.`
  },
  {
    'Kor': `시작하기 앞서 캐릭터 생성을 하겠습니다.`,
    'Eng': `Before we begin, let's create a character.`
  },
  {
    'Kor': `이름을 입력해 주세요`,
    'Eng': `Please enter your name.`
  },
  {
    'Kor': `이름을 입력해 주세요`,
    'Eng': `Please enter your name.`
  },
  {
    'Kor': `안녕하세요. [][]님. 다음은 캐릭터 능력치를 설정하겟습니다.`,
    'Eng': `Hello. [][]. Next we will set character stats.`
  },
  {
    'Kor': `주사위를 클릭하주세요.`,
    'Eng': `Please click the dice.`
  },
]



type NpcProps = {
  index: number;
  user: characterState;
  renderDone: () => void
}
const Npc = ({index, renderDone, user}: NpcProps) => {
  const language   = useAppSelector((state) => state.languageReducer.language);
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
                finishRenderHandler={renderDone}
              />
            </div>
          </>
        )
        case 3:
          return (
            <>
              <div className={Styles['start__npc-tri']}>
                <div></div>
              </div>
              <div className={Styles['start__npc-sqa']}>
                <TypingText
                  text ={textArr[3][language]}
                  finishRenderHandler={renderDone}
                />
              </div>
            </>
          )
        case 5:
          return (
            <>
              <div className={Styles['start__npc-tri']}>
                <div></div>
              </div>
              <div className={Styles['start__npc-sqa']}>
                <TypingText
                  text ={textArr[5][language]}
                  variableArr ={[user.name]}
                  finishRenderHandler={renderDone}
                />
              </div>
            </>
          )
        case 6:
          return (
            <>
              <div className={Styles['start__npc-tri']}>
                <div></div>
              </div>
              <div className={Styles['start__npc-sqa']}>
                <TypingText
                  text ={textArr[6][language]}
                  finishRenderHandler={renderDone}
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

type UserProps = {
  index: number;
  renderDone: () => void;
  user: characterState;
  setUser: (name: string, value: string) => void
}
const User = ({index, renderDone, user, setUser}: UserProps) => {
  const language   = useAppSelector((state) => state.languageReducer.language);
  const [ errMsg , setErrMsg ] = useState('');
  
  const validate = () => {
    if (StrLib.isNull(user.name)) {
      setErrMsg(textArr[4][language])
    } else {
      renderDone()

    }
  }
  
  const errRenderDone = () => {
    setTimeout(() => {
      setErrMsg('');
    }, 1000)
  }

  const makeTyping = () => {
    switch(index) {
      case 4:
        return (
          <>
            <div className={Styles['start__user-sqa']}>
              <div className={Styles['user__input']}>
                <div className={Styles['user__input-label']}>{language === 'Kor' ? '이름 : ' : 'Name : '}</div>
                <Input 
                  name={'name'} 
                  maxLength={10}
                  value={user.name} 
                  placeholder={''}
                  onChange={(name, value) => setUser(name, value)}    
                  onEnterPress={validate}         
                />
                <Button 
                  onClickEvent={validate}
                  value={language === 'Kor' ? '제출' : 'Submit'}
                />
              </div>
              {
                errMsg !== '' && 
                <TypingText
                  text ={errMsg}
                  finishRenderHandler={errRenderDone}
                  nextBtn={false}
                />
              }
            </div>
            <div className={Styles['start__user-tri']}>
              <div></div>
            </div>
          </>
        )
      case 7: 
        return (
          <>
            <div className={Styles['start__user-sqa']}> 
              <Dices/>
            </div>
            <div className={Styles['start__user-tri']}>
              <div></div>
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

type ContentsProps = {
  index: number;
  renderDone: () => void;
  user: characterState;
  setUser: (name: string, value: string) => void
}
const Contents = ({index, renderDone, user, setUser}: ContentsProps) => {
  const language   = useAppSelector((state) => state.languageReducer.language);

  const makeTyping = () => {
    switch(index) {
      case 5:
        return (
          <div className={Styles.contents__display}>
            {user.name}
          </div>
        )
      case 6:
        return (
          <>
            <div className={Styles.contents__display}>
              {user.name}
            </div>
          </>
        )
      case 7:
        return (
          <>
            <div className={Styles.contents__display}>
              {user.name}
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
  const dispatch = useAppDispatch();
  const [ index, setIndex ] = useState(0);
  const [ user , setUser  ] = useState({name: '', level: 0, attack: 0, speed: 0, critical: 0, exp: 0})
  
  console.log(index)
  
  const renderDone = () =>{
    console.log("renderDone")
    console.log(index)
    console.log("renderDone")
    setIndex(prev => prev + 1)
  }

  const { npcVisible, contentVisible, userVisible } = useMemo(() => {
    let npcVisible     = false;
    let contentVisible = false;
    let userVisible    = false;

    if (index < 4) {
      npcVisible = true;
    } else if (index < 5) {
      userVisible = true;
    } else if (index < 7) {
      npcVisible = true;
      contentVisible = true;
    } else if (index < 8) {
      userVisible = true;
      contentVisible = true;
    } else {
      contentVisible = true;
    }

    return { npcVisible, contentVisible, userVisible }
  }, [index]);  


  const setUserHandler = (name: string, value: string) => {
    setUser(prev => {return {...prev, [name]: value}})
  }

  return (
    <>
      <div className={Styles.start__npc}>
        {npcVisible && <Npc index={index} renderDone={renderDone} user={user} />}
      </div>
      <div className={Styles.start__contents}>
        {contentVisible && <Contents index={index} renderDone={renderDone} user={user} setUser={setUserHandler}/>}
      </div>
      <div className={Styles.start__user}>
        {userVisible && <User index={index} renderDone={renderDone} user={user} setUser={setUserHandler}/>}
      </div>
    </>
  )
}
const Start = () => {
  return (
    <DelayView delay={1000}>
      <div className={`${Styles.start}`}>
        <Conv/>
      </div>
    </DelayView>
  )
}


export default Start;
