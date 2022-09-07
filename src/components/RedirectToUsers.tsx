import React from 'react';
import {Navigate} from 'react-router-dom';

//The only purpose of this component is to redirect to the users. Since our home page /
// shouldn't contain users
export const RedirectToUsers = () => <Navigate to={'/users'}/>;

