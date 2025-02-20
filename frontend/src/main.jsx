import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import {Bounce,ToastContainer} from 'react-toastify'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}> 
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1400}
        hideProgressBar={true}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
