import styles from './Language.module.scss';
import { useAppDispatch, useAppSelector } from 'reduxStore/Hook';
import { setLanguage } from 'reduxStore/languageSlice';


const Language = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
  const language = useAppSelector((state) => state.languageReducer.language);
  const LanguageList = [
    {
      id    : 1,
      language : 'Kor',
    },
    {
      id    : 2,
      language : 'Eng',
    }
  ];
  return (
    <div className={styles.language}>
      {LanguageList.map((lang, index) =>
        <div className={`${styles[`language-${themeColor}`]} ` } key={index}>
          <div
            className={`${styles.language__button} ${language === lang.language ? styles['language__button-selected'] : ''}`}
            onClick={() => dispatch(setLanguage(lang.language))}
            key={lang.id}
          >
            {lang.language}
          </div>
        </div>
      )}
    </div>
  )
}

export default Language;