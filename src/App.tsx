import './App.css'
import { Toaster } from 'sonner'
import AppContent from './components/AppContent'

function App() {
  return (
    <>
      <AppContent />
        <Toaster
          richColors 
          closeButton  
          visibleToasts={5} 
          // theme={theme}
          position='top-center'
          style={{marginTop: "-20px"}}
        />
    </>
  )
}

export default App
