import { createContext, useContext } from "react"

export const LocaleContext = createContext<string>("")

export const useLocale = () => useContext(LocaleContext)

const LocaleContextProvider = ({ locale, children }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
)

export default LocaleContextProvider
