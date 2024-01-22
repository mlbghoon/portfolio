import { Provider }           from 'react-redux';
import { store } from 'reduxStore/store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { WelcomePage, PageOnePage, AboutPage } from 'pages';
import { Frame } from 'components/templates';
import  "./Transition.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const RouteTransition = ({ location, children }: any) => {
  const pathname = location.pathname;

  return (
    <TransitionGroup className={'transition-wrapper'}>
      <CSSTransition
        key={pathname}
        timeout={1000}
        classNames={'navigate-push'}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};


function App () {
  const location = useLocation();
  return (
    <Provider store={store}>
      <Frame>
        <RouteTransition location={location}>
          <Routes location={location}>
            <Route path="/" element={<AboutPage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route
              path="/Showcase"
              element={<PageOnePage/>}
            />
            <Route path="/Skills" element={<WelcomePage />} />
          </Routes>
        </RouteTransition>
      </Frame>
    </Provider>
  )
};

export default App;