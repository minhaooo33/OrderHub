import { useState } from "react";
import { createContext } from "react";

const UserProgressContext = createContext({
progress:"",
showCart: () => {},
hideCart: () =>  {},
checkout: () => {},
});

export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState("");
    
    function showCart(){
        setUserProgress("show");
    };

    function hideCart(){
        setUserProgress("");
    };

 
 const UserProgressContextValue = {
        progress: userProgress,
        showCart: showCart,
        hideCart: hideCart,
  
    }
    
    return (
    <UserProgressContext.Provider value={UserProgressContextValue}>{children}</UserProgressContext.Provider>
    )
}

export default UserProgressContext;