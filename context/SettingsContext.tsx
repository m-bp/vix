import { Settings } from "lib/sanity.queries"
import { createContext, useContext } from "react"

export const SettingsContext = createContext<Settings>({})

export const useSettings = () => useContext(SettingsContext)

const SettingsContextProvider = ({ settings, children }) => (
  <SettingsContext.Provider value={settings}>
    {children}
  </SettingsContext.Provider>
)

export default SettingsContextProvider
