import { ChangeEvent, KeyboardEvent } from 'react'
import Styles from './Input.module.scss';

type TextfieldProps = {
  name        : string;
  value       : string;
  readOnly?   : boolean;
  disabled?   : boolean;
  maxLength?  : number;
  placeholder?: string;
  onChange?(name: string, value: string): void;
  onEnterPress?(): void;
};

const Input = (props: TextfieldProps) => {
	const {name, value, readOnly=false, disabled=false, placeholder="", onChange=()=>{}, onEnterPress} = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		// const inputValue = event.target.value;
    onChange(name, event.target.value);
	}
	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

		if (key === 'Enter' && onEnterPress) {
			onEnterPress();

		}
	};
  return (
    <input
      name         = {name}
      type         = {"text"}
      value        = {value}
      readOnly     = {readOnly}
      disabled     = {disabled}
      placeholder  = {placeholder}
      autoComplete = {"off"}
      onChange     = {handleChange}
      onKeyUp      = {handleKeyPress}
      className={Styles.input}
    />
	);
}

export { Input };