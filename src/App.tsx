import { Provider } from 'react-redux';
import { store } from 'reduxStore/store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { WelcomePage, PageOnePage, AboutPage, LoadingPage, StartPage } from 'pages';
import { Frame } from 'components/templates';

function App () {
  const location = useLocation();
  return (
    <Provider store={store}>
      {location.pathname === '/'
        ? <LoadingPage />
        : <Frame>
            <Routes location={location}>
              <Route path="/Start" element={<StartPage />} />
              <Route path="/About" element={<AboutPage />} />
              <Route
                path="/Showcase"
                element={<PageOnePage/>}
              />
              <Route path="/Skills" element={<WelcomePage />} />
            </Routes>
          </Frame>
      }
    </Provider>
  )
};

export default App;