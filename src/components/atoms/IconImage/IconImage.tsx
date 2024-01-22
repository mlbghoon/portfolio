import Welcome          from 'assets/images/welcome.png';
import Person           from 'assets/images/icons/welcome/person.svg';
import Calendar         from 'assets/images/icons/welcome/calendar.svg';
import Home             from 'assets/images/icons/welcome/home.svg';
import Phone            from 'assets/images/icons/welcome/phone.svg';
import Email            from 'assets/images/icons/welcome/email.svg';
import History          from 'assets/images/icons/welcome/history.svg';


const isDiscernIcon = ({ icon }: { icon: string}) => {
  switch (icon) {
    case 'WELCOME':
      return Welcome;

    case 'PERSON':
      return Person;
    case 'CALENDAR':
      return Calendar;
    case 'HOME':
      return Home;
    case 'PHONE':
      return Phone;
    case 'EMAIL':
      return Email;
    case 'HISTORY':
      return History;


    default:
      break;
  }
}

const IconImage = ({name, icon, onClickEvent}: any) => {
  const Icon = isDiscernIcon({ icon });
  const onClickHandler = () => {
    onClickEvent && onClickEvent(name);
  }
  return (
    <>
      <img src={Icon} alt="아이콘" onClick={onClickHandler}/>
    </>
  )
};

export { IconImage };