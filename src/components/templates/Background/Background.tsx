import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useAppSelector } from 'reduxStore/Hook';

import Styles from './Background.module.scss';

const Background = () => {
  const [star, setStar] = useState({size: '2', speed: '5'})
  const language = useAppSelector((state) => state.languageReducer.language);
  const makeDataTest = useCallback(() => {
    function getRandomArbitrary(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let data = []

    var style = [Styles.style1, Styles.style2, Styles.style3];
    var tam = [Styles.tam1, Styles.tam2, Styles.tam2, Styles.tam3, Styles.tam3];
    var opacity = [Styles.opacity1, Styles.opacity1, Styles.opacity1, Styles.opacity2, Styles.opacity2, Styles.opacity3];

    var qtdeEstrelas = 300;
    var widthWindow = window.innerWidth;
    var heightWindow = window.innerHeight;

    for (var i = 0; i < qtdeEstrelas; i++) {
      data.push(
        <span
          key = {i}
          className={`${Styles.estrela} ${style[getRandomArbitrary(0, 3)]} ${opacity[getRandomArbitrary(0, 6)]} ${tam[getRandomArbitrary(0, 5)]}`}
          style={{animationDelay: `${getRandomArbitrary(0, 9)}s`, transform: `translate(${getRandomArbitrary(widthWindow * -0.3, widthWindow * 1.3)}px, ${getRandomArbitrary(heightWindow * -0.3, heightWindow * 1.3)}px)`}}>
        </span>
      )
    }

    return (
     data
    )
  }, [])
  useEffect(()=>{
    document.documentElement.style.setProperty(`--star-speed`, `120s`);
    document.documentElement.style.setProperty(`--star-size-s`, `1px`);
    document.documentElement.style.setProperty(`--star-size-m`, `2px`);
    document.documentElement.style.setProperty(`--star-size-l`, `3px`);
    return () => {
      document.documentElement.style.removeProperty('--star-speed');
      document.documentElement.style.removeProperty('--star-size-s');
      document.documentElement.style.removeProperty('--star-size-m');
      document.documentElement.style.removeProperty('--star-size-l');
    };
  }, [])

  const changeSpinSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    setStar(prev => {return {...prev, speed: e.target.value}});
    const speed = 600 / Number(e.target.value);
    document.documentElement.style.setProperty(`--star-speed`, `${speed}s`);
  }
  const changeSize = (e: ChangeEvent<HTMLInputElement>) => {
    setStar(prev => {return {...prev, size: e.target.value}});
    const sizes = Number(e.target.value) / 2;
    const sizem = sizes * 2;
    const sizel = sizes * 3;
    document.documentElement.style.setProperty(`--star-size-s`, `${sizes}px`);
    document.documentElement.style.setProperty(`--star-size-m`, `${sizem}px`);
    document.documentElement.style.setProperty(`--star-size-l`, `${sizel}px`);
  }
  return (
    <div className={Styles.loading__background}>
      <div className={Styles.noite}></div>

      <div className={Styles.constelacao}>
        {makeDataTest()}
      </div>

      <div className={Styles.lua}>
        <div className={Styles.textura}></div>
      </div>
      <div className={Styles.testtt}></div>
      <div className={Styles.chuvaMeteoro}></div>

      <div className={Styles.floresta}>
        <img src="https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png" alt="" />
      </div>
      <div className={Styles.spinspeed__wrapper}>
        {language === 'Kor' ? '크기' : 'Size'}
        <input type="range" name="size" min="0" max="5" value={star.size} step="1" onChange={changeSize}/>
        {language === 'Kor' ? '속도' : 'Speed'}
        <input type="range" name="speed" min="0" max="50" value={star.speed} step="5" onChange={changeSpinSpeed}/>
      </div>
    </div>
    )
}

export { Background };