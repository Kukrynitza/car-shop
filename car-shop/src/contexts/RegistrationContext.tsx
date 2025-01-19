import { createContext } from 'react'

interface RegistrationContextType {
  registration: boolean
  setRegistration: (value: boolean) => void
}
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined)

export default RegistrationContext
