import { createContext } from 'react'

interface RegistrationContextType {
  registration: boolean
  setRegistration: (value: boolean) => void
}
const RegistrationContext = createContext<RegistrationContextType | null>(null)

export default RegistrationContext
