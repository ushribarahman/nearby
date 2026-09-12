import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore authentication.
    // The JWT lives in an httpOnly cookie set by the backend, so the browser
    // sends it automatically with every request — we just ask the API who
    // we are, instead of reading a token out of localStorage.
    useEffect(() => {
        const restoreUser = async () => {
            try {
                const response = await authService.getProfile();

                setUser(response.user);
            } catch (error) {
                // No valid session cookie (or it expired) — that's fine,
                // it just means the user isn't logged in.
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

        // The backend already set the httpOnly auth cookie on this response;
        // we only need to keep the user info in memory.
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

    // Update profile (text fields only — no image upload here, see
    // uploadProfilePicture/removeProfilePicture below for that). Used
    // by both the regular user and organizer profile pages.
    const updateProfile = async (profileData) => {
        const response = await authService.updateProfile(
            profileData
        );

        setUser(response.user);

        return response;
    };

    // Upload / update profile picture. Auth is via the same httpOnly
    // cookie as every other request — no separate token to manage.
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
