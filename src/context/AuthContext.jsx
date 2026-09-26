import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const response = await authService.getProfile();

                setUser(response.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreUser();
    }, []);

    // Login
    const login = async (
        credentials,
        expectedRole = null
    ) => {
        const response = await authService.login(
            credentials
        );

        const loggedInUser = response.user;

        // Validate role BEFORE saving the session
        if (
            expectedRole &&
            loggedInUser.role !== expectedRole
        ) {
            const error = new Error(
                expectedRole === "organizer"
                    ? "This account is not registered as an organizer."
                    : "Please use the organizer login option for this account."
            );

            error.code = "INVALID_ROLE";

            throw error;
        }

        setUser(loggedInUser);

        return response;
    };

    // Register
    const register = async (userData) => {
        const response = await authService.register(
            userData
        );

        return response;
    };

    const updateProfile = async (profileData) => {
        const response = await authService.updateProfile(
            profileData
        );

        setUser(response.user);

        return response;
    };

    const uploadProfilePicture = async (file) => {
        const response = await authService.uploadProfilePicture(file);

        setUser(response.user);

        return response;
    };

    // Remove profile picture
    const removeProfilePicture = async () => {
        const response = await authService.deleteProfilePicture();

        setUser(response.user);

        return response;
    };

    // Logout
    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setUser(null);
        }
    };

    // Auth Status
    const isAuthenticated = !!user;

    // Context
    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        updateProfile,
        uploadProfilePicture,
        removeProfilePicture,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}
