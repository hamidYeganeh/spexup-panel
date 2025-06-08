// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { I18nextProvider } from 'react-i18next';
import i18n from './features/i18n/i18n-config';
import './utils/highlight';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import { store } from './features/redux/store';
import { SnackbarProvider } from 'notistack';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import { AuthProvider } from './contexts/JWTContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <ThemeColorPresets>
              <RtlLayout>
                <I18nextProvider i18n={i18n}>
                  <MotionLazyContainer>
                    <SnackbarProvider preventDuplicate maxSnack={3} />
                    <ProgressBarStyle />

                    <ScrollToTop />
                    <Router />
                  </MotionLazyContainer>
                </I18nextProvider>
              </RtlLayout>
            </ThemeColorPresets>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </QueryParamProvider>
  );
}
