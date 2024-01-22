
import { useEffect, useState } from 'react';
import * as Hangul from 'hangul-js';
import Styles from './TypingText.module.scss';

type TypingTextProps = {
  text: string;
  variableArr: Array<string>;
}

const TypingText = ({text, variableArr}: TypingTextProps) => {
  const [fullText, setFullText] = useState(['']);
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    for (let i = 0; i < timeoutIds.length; i ++) {
      clearTimeout(timeoutIds[i])
    }
    setTimeoutIds([]);

    let fullText = text;
    for (let i = 0; i < variableArr.length; i++) {
      fullText = fullText.replace('[][]', variableArr[i]);
    }

    const textArr = fullText.split('\n');

    let currText = '';
    let prevText = '';
    let typingArr:Array<string> = [];
    let time = 0;
    for (let i = 0; i < textArr.length; i ++) {
      let newlineTyping = Hangul.disassemble(textArr[i]);
      let divide = Math.floor(newlineTyping.length / 11);
      let wrongTypeRandom = Math.floor(Math.random() * (11 - 0 + 1)) + 1;

      for (let j = 0; j <= newlineTyping.length; j++) {

        if (wrongTypeRandom === j && divide > 0) {
          let tempText: string[] = JSON.parse(JSON.stringify(newlineTyping.slice(0, j)));
          tempText.push(tempText[tempText.length-1]);
          typingArr.push(prevText + Hangul.assemble(newlineTyping.slice(0, j)));
          typingArr.push(prevText + Hangul.assemble(tempText));
          typingArr.push(prevText + Hangul.assemble(newlineTyping.slice(0, j)));
          divide --;
          wrongTypeRandom = Math.floor(Math.random() * (11 - 0 + 1)) + j;
        } else {
          currText = Hangul.assemble(newlineTyping.slice(0, j));
          typingArr.push(prevText + currText);

        }
      }
      prevText = prevText + currText + '\n';
    }
    let testArr = [];
    for (let i = 0; i < typingArr.length; i ++) {
      time += Math.floor(Math.random() * (100 - 40 + 1)) + 40;

      let timeoutId = setTimeout(() => {
        setFullText(typingArr[i].split('\n'))
      }, time);
      testArr.push(timeoutId)
    }

    setTimeoutIds(testArr)
  }, [variableArr, text]);

  return (
    <div className={Styles.typing__container}>
      {fullText.map((line, key) => {
        return <div className={Styles.typing__line}key={key}>{line}</div>
      })}
    </div>
  )
}
export { TypingText };