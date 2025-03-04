import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch(action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true };
        
        case 'logout':
            return { ...state, user: null, isAuthenticated: false };
        
        default:
            throw new Error('Invalid action type');
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login({ email, password }) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: 'logout' });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

export { AuthProvider, useAuth };
