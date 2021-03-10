import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

export default function PrivateRoute({component: Component, ...rest}) {

    const userStatus = useSelector(state => state.isSignedIn)

    const {isSignedIn} = userStatus
    
    return(
        <Route {...rest}
        render={(props)=> isSignedIn ? <Component {...props} /> : <Redirect to='/'/>}
        />
    )
}