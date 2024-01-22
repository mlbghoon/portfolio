// TransitionFade.tsx
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './TransitionFade.css';

interface TransitionFadeProps {
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

const TransitionFade: React.FC<TransitionFadeProps> = ({ children, ...props }) => {
  return (
    <CSSTransition classNames="fade" timeout={300} {...props}>
      <div className="fade">
      {children}
      </div>
    </CSSTransition>
  );
};

export {TransitionFade};
