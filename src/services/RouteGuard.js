import { getToken, isAdminUser, isAuthenticated, refreshToken } from "./auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const oldToken = getToken();
      if (!oldToken || tokenRefreshed) return;

      try {
        const response = await refreshToken(oldToken);
        if (response?.data?.token) {
          localStorage.setItem("token", response.data.token);
          setTokenRefreshed(true); // Mark token as refreshed to prevent loops
        }
      } catch (err) {
        console.log("Failed to refresh token, logging out...");
        router.replace("/login");
      }
    };

    checkAndRefreshToken();
  }, [tokenRefreshed]); // Dependency ensures it runs only once

  useEffect(() => {
    const isAuth = isAuthenticated();
    const isAdmin = isAdminUser();

    const publicPaths = ["/login", "/register"];
    const userPaths = []; //path for user
    const adminPaths = []; //path for admin

    const isPublic = publicPaths.includes(router.pathname);
    const isUserPage = userPaths.includes(router.pathname);
    const isAdminPage = adminPaths.includes(router.pathname) || router.pathname.startsWith("/admin/");

    if (router.pathname === "/404") return;

    //TODO : Implement permission check after all pages are ready

    // if (!isAuth && !isPublic) {
    //   router.replace("/login");
    //   return;
    // }

    // if (isUserPage && !isAuth) {
    //   router.replace("/product");
    //   return;
    // }

    // if (isAdminPage && !isAdmin) {
    //   router.replace("/403");
    //   return;
    // }
  }, [router.pathname]); // React only when the route changes

  return <>{children}</>;
};

export default RouteGuard;
