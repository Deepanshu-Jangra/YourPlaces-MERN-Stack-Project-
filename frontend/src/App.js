import React, { useState, useCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Users from "./user/pages/Users";
import RootLayout from "./shared/components/Layouts/RootLayout";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Users /> },
        { path: "places/new", element: <NewPlace /> },
        { path: ":userId/places", element: <UserPlaces /> },
        { path: "places/:placeId", element: <UpdatePlace /> },
        { path: "auth", element: <Auth /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
