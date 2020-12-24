import React from 'react'

export const LayoutContext = React.createContext({isSearchHeader : false});

const LayoutProvider = ({children}) => {
    
return(<LayoutContext.Provider>{children}</LayoutContext.Provider>)
}
 
export default LayoutProvider;