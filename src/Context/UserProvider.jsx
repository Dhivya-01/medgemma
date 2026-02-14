import { useState } from "react";
import { UserContext } from "./context";


// eslint-disable-next-line react/prop-types
const UserProvider = ({children}) => {
    const [name,setName] = useState("")
    const [id,setid] = useState('')

    const value = {
        name,
        setName,
        id,
        setid
    }
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserProvider