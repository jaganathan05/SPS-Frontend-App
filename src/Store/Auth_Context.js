import React from "react";

const Authcontext = React.createContext({
    isloggedin : false,
    GamerName : null ,
    Token : null,
    loginHandler : ()=>{

    },
    logoutHandler : ()=>{

    }
})

export default Authcontext;