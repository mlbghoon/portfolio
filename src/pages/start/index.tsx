import { useEffect, useMemo, useRef, useState       } from 'react';
import { useAppDispatch, useAppSelector } from 'reduxStore/Hook';
import { Button, DelayView, Input, TypingText          } from 'components/atoms'
import Styles from './start.module.scss';
import { DateLib, StrLib } from 'utils';
import { characterState, setName } from 'reduxStore/characterSlice';

const diceFace = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];



type diceProp = {
  clicked: boolean;
  facing : number | null
}
const Dice = ({clicked, facing} : diceProp) => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);

  return (
    <div className={`${Styles.die} ${clicked ? Styles.rolling : ''} ${Styles['die-' + themeColor]}`} data-face={facing}>
      {diceFace.map((face, key) => {
        return (
          <figure key={key} className={`${Styles.face} ${Styles['face-' + face]} ${facing === face ? Styles.active : ''}`}></figure>
        )
      })}
    </div>
  )
}
const Dices = () => {
  const [ clickedOne  , setClickedOne   ] = useState(false);
  const [ clickedTwo  , setClickedTwo   ] = useState(false);
  const [ clickedThree, setClickedThree ] = useState(false);
  const [ facingOne   , setFacingOne   ] = useState<number | null>(null);
  const [ facingTwo   , setFacingTwo   ] = useState<number | null>(null);
  const [ facingThree , setFacingThree ] = useState<number | null>(null);

  const roll = (index: number) => {
    switch (index) {
      case 0:
        setClickedOne(true)

        setTimeout(function () {
          setClickedOne(false)
          setFacingOne(Math.floor((Math.random() * 20)) + 1)
        }, 3000)

        break;
      case 1:
        setClickedTwo(true)

        setTimeout(function () {
          setClickedTwo(false)
          setFacingTwo(Math.floor((Math.random() * 20)) + 1)
        }, 3000)
        break;
      default:
        setClickedThree(true)

        setTimeout(function () {
          setClickedThree(false)
          setFacingThree(Math.floor((Math.random() * 20)) + 1)
        }, 3000)
        break;
    }
  }
  const rollAll = () => {
    setClickedOne(true)
    setClickedTwo(true)
    setClickedThree(true)

    setTimeout(function () {
      setClickedOne(false)
      setClickedTwo(false)
      setClickedThree(false)

      setFacingOne(Math.floor((Math.random() * 20)) + 1)
      setFacingTwo(Math.floor((Math.random() * 20)) + 1)
      setFacingThree(Math.floor((Math.random() * 20)) + 1)
    }, 3000)
  }
  const confirmStat = () => {

  }
  return (
    <>
      <div className={Styles['dices-wrapper']}>
        <div className={Styles['dice-wrapper']}>
          <div className={Styles['dice-content']} onClick={() => roll(0)}>
            <Dice 
              clicked={clickedOne} 
              facing={facingOne}            
            />
          </div>
          <div className={Styles['dice-label']}>공격</div>
        </div>
        <div className={Styles['dice-wrapper']}>
          <div className={Styles['dice-content']} onClick={() => roll(1)}>
            <Dice 
              clicked={clickedTwo} 
              facing={facingTwo}            
            />
          </div>
          <div className={Styles['dice-label']}>속도</div>
        </div>
        <div className={Styles['dice-wrapper']}>
          <div className={Styles['dice-content']} onClick={() => roll(2)}>
            <Dice 
              clicked={clickedThree} 
              facing={facingThree}            
            />
          </div>
          <div className={Styles['dice-label']}>크리티컬</div>
        </div>
      </div>
      <div>
        <Button 
          onClickEvent={rollAll}
          value='모두 굴리기'
        />
        <Button 
          onClickEvent={confirmStat}
          value='확정'
        />
      </div>
    </>
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
  language: 'Kor' | 'Eng';
  user: characterState;
  renderDone: () => void
}
const Npc = ({index, language, renderDone, user}: NpcProps) => {
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
  language: string;
  user: characterState;
  setUser: (name: string, value: string) => void
}
const User = ({index, renderDone, user, setUser, language}: UserProps) => {
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
              <div className={Styles['start__user-inputWrapper']}>
                <div>{language === 'Kor' ? '이름 : ' : 'Name : '}</div>
                <Input 
                  name={'name'} 
                  value={user.name} 
                  placeholder={''}
                  onChange={(name, value) => setUser(name, value)}    
                  onEnterPress={validate}         
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
  language: string;
  user: characterState;
  setUser: (name: string, value: string) => void
}
const Contents = ({index, renderDone, user, setUser, language}: ContentsProps) => {

  const makeTyping = () => {
    switch(index) {
      case 5:
        return (
          <>
            {user.name}
          </>
        )
      case 6:
        return (
          <>
            {user.name}
            <Dices/>
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
  const dispatch = useAppDispatch();
  
  const [ index, setIndex ] = useState(0);
  const [ user , setUser  ] = useState({name: '', level: 0, attack: 0, speed: 0, critical: 0, exp: 0})
  
  
  const renderDone = () =>{
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
        {npcVisible && <Npc index={index} renderDone={renderDone} language={language} user={user} />}
      </div>
      <div className={Styles.start__contents}>
        {contentVisible && <Contents index={index} renderDone={renderDone} language={language} user={user} setUser={setUserHandler}/>}
      </div>
      <div className={Styles.start__user}>
        {userVisible && <User index={index} language={language}  renderDone={renderDone} user={user} setUser={setUserHandler}/>}
      </div>
    </>
  )
}
const Start = () => {
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);

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
