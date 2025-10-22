import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/index.js'
import { ServiceTypeProvider } from './components/SwitchServiceType/ServiceTypeContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ServiceTypeProvider>
        <App />
      </ServiceTypeProvider>
    </PersistGate>
  </Provider>
)
