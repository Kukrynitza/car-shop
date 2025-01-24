import { createContext } from 'react'

interface RegistrationContextType {
  registration: number
  setRegistration: (value: number) => void
}
const RegistrationContext = createContext<RegistrationContextType | null>(null)

export default RegistrationContext
