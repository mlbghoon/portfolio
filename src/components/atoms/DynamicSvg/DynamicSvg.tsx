import Person   from 'assets/images/icons/welcome/person.svg'
import Calendar from 'assets/images/icons/welcome/calendar.svg'
import Home     from 'assets/images/icons/welcome/home.svg'
import Phone    from 'assets/images/icons/welcome/phone.svg'
import Email    from 'assets/images/icons/welcome/email.svg'
import History  from 'assets/images/icons/welcome/history.svg'


const isDiscernIcon = (props: { svg : string}) => {

  switch (props.svg) {
    case 'HOME':
      return <Home />;
    case 'PERSON':
      return <Person />;
    case 'CALENDAR':
      return <Calendar />;
    case 'PHONE':
      return <Phone />;
    case 'EMAIL':
      return <Email />;
    case 'HISTORY':
      return <History />;
    default:
      break;
  }
}


const DynamicSvg = ( {svg} : {svg: string} ) => {
  const Svg = isDiscernIcon({ svg });
  return (
    <div>
      {Svg}
    </div>
  )
}

export { DynamicSvg };