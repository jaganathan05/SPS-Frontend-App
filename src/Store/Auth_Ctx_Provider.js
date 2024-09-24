import { useState } from "react";
import Authcontext from "./Auth_Context";

function AuthProvider(props){

    const inititialvalue = localStorage.getItem('usertoken')
    const initialname = localStorage.getItem('username')
    const [name,setName] = useState(initialname)
    const [token ,settoken] = useState(inititialvalue)
    const [status , updatedstatus] = useState(!!inititialvalue)
    const LoginHandler = (Token,Name)=>{
        settoken(Token)
        setName(Name)
        updatedstatus(true)
    }

    const LogoutHandler = ()=>{
        settoken(null)
        setName(null)
        updatedstatus(false)
        localStorage.removeItem('usertoken')
        localStorage.removeItem('username')
    }

    const contextvalue = {
        Token : token ,
        GamerName : name ,
        isloggedin : status ,
        loginHandler : LoginHandler ,
        logoutHandler : LogoutHandler 
    }

    return <Authcontext.Provider value={contextvalue}>
        {props.children}
    </Authcontext.Provider>

}

export default AuthProvider;