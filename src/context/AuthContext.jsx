import React, { useState, useEffect } from 'react';
import { DEMO_ACCOUNTS } from '../data/mockData';
import { AuthContext } from './authContextDef';

const STORAGE_KEY = 'cnhs_learn_auth_user';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage parse fails
    }
    return DEMO_ACCOUNTS.admin;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [currentUser]);

  const loginAs = (accountKey) => {
    const account = DEMO_ACCOUNTS[accountKey];
    if (account) {
      setCurrentUser(account);
      return account;
    }
    return currentUser;
  };

  const loginWithCredentials = (email, _password) => {
    const matchedKey = Object.keys(DEMO_ACCOUNTS).find(
      (key) => DEMO_ACCOUNTS[key].email.toLowerCase() === email.trim().toLowerCase()
    );
    if (matchedKey) {
      setCurrentUser(DEMO_ACCOUNTS[matchedKey]);
      return DEMO_ACCOUNTS[matchedKey];
    }
    // Default fallback to admin if unmatched
    const fallbackUser = {
      ...DEMO_ACCOUNTS.admin,
      email: email || DEMO_ACCOUNTS.admin.email,
    };
    setCurrentUser(fallbackUser);
    return fallbackUser;
  };

  const switchUser = (accountKey) => {
    return loginAs(accountKey);
  };

  const logout = () => {
    // Reset to admin or clear session
    setCurrentUser(DEMO_ACCOUNTS.admin);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const isAdmin = currentUser?.role === 'Admin';
  const isTeacher = currentUser?.role === 'Teacher';

  const value = {
    currentUser,
    setCurrentUser,
    loginAs,
    loginWithCredentials,
    switchUser,
    logout,
    isAdmin,
    isTeacher,
    availableAccounts: DEMO_ACCOUNTS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
