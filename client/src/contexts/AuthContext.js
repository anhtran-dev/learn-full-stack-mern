import {createContext , useReducer , useEffect} from 'react';
import {authReducer} from '../reducers/authReducer';
import axiosClient from "../api/axiosClient";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading : true,
        isAuthenticated : false,
        user : null
    });

    // Authenticated
    const loadUser = async () => {
        if(localStorage['access_token']){
            setAuthToken(localStorage['access_token']);
        }
        try{
            const response = await axiosClient.get('/auth');
            if(response.success){
                dispatch({
                    type : 'SET_AUTH',
                    payload : {
                        isAuthenticated : true,
                        user : response.data,
                    }
                })
            }
        } catch (e) {
            localStorage.removeItem('access_token');
            setAuthToken(null);
            dispatch({
                type : 'SET_AUTH',
                payload : {
                    isAuthenticated : false,
                    user : null,
                }
            })
        }
    };

    useEffect(() => {
        loadUser();
    }, []);
    // login
    const loginUser = async userForm => {
        try{
            const response = await axiosClient.post('/auth/login', userForm);
            if(response.success){
                localStorage.setItem('access_token' , response.access_token);
            }
            await loadUser();
            return response;
        } catch (e) {
            if (e.response.data) return e.response.data;
            else return {success : false , message : e.message};
        }
    };

    // Context data
    const authContextData = {loginUser, authState};

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;
