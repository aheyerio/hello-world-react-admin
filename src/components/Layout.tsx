import React, {Dispatch, useEffect, useState} from 'react';
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios"
import {Navigate} from "react-router-dom";
import {User} from "../models/user";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";

// We take the nav and the top bar into a layout because we want all pages to have this layout
const Layout = (props: any) => {
    const [redirect, setRedirect] = useState(false);
    // const [user, setUser] = useState<User | null>(null); //  this is the TS way, this is either user or null

    // This is a check that we will do on every single component, essentially this is our credentials check.
    // useEffect uses 2 arguments. The first is a function where we attempt to hit the user api sending over
    // the JWT cookie. If that isn't successful then redirect the user to login.
    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user') // Must send with credentials or JWT won't be sent
    console.log("Seeting the data boyos")
                    // setUser(data); // I comment this out becuase we used to use this data as a props to pass it to
                    // other components. However we are switching to using redux instea.
                    props.setUser(data);
                } catch (e) {
                    setRedirect(true)
                }
            }
        )();
    }, []);

    if (redirect) {
        console.log("getting called dawg")
        return <Navigate to={'/login'}/>
    }


    return (
        <div>
            <Nav/>

            <div className="container-fluid">
                <div className="row">

                    <Menu/>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h2>Section title</h2>
                        <div className="table-responsive">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: {user: User}) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

// export default Layout // this was the way to export this component before we wanted it to use redux.