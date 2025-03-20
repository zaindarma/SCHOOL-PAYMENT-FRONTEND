import { useToast } from "@/context/ToastContext";
import { getToken, isAdminUser, isAuthenticated, logout, refreshToken } from "./auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const [message, setMessage] = useState(null);
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
        showToast("Token invalid, logging out...");
        logout();
      }
    };

    checkAndRefreshToken();
  }, [tokenRefreshed]); // Dependency ensures it runs only once
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (redirected) {
      setRedirected(false);
      showToast(message, true);
    }
    const isAuth = isAuthenticated();
    const isAdmin = isAdminUser();

    const publicPaths = ["/main", "/payind", "/register", "/register/registsuccess"];
    const userPaths = ["/payment"];
    const isPublic = publicPaths.includes(router.pathname);
    const isUserPage = userPaths.includes(router.pathname);
    const isAdminPage = router.pathname.startsWith("/admin");

    if (router.pathname === "/404" || router.pathname === "/403") {
      setCheckingAuth(false);
    } else if (!isAuth && !isPublic) {
      setMessage("You are not logged in.");
      setRedirected(true);
      router.push(isAdminPage ? "/403" : "/main");
    } else if (isUserPage && isAdmin) {
      setMessage("Admin not authorized to access user page.");
      setRedirected(true);
      router.replace("/main");
    } else if (isAuth && isAdminPage && !isAdmin) {
      setMessage("You are not authorized to access this page.");
      setRedirected(true);
      router.push("/403");
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null; // Prevents hydration issues by not rendering anything until auth is checked
  }

  return <>{children}</>;
};

export default RouteGuard;
