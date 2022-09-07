import {User} from "../../models/user";

// Every action must have a type, we are setting ours to SET_USER
// All we are doing is setting a user and setting a type
export const setUser = (user: User) => ({
    type: 'SET_USER',
    user
})