"use client";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface UseTokenType {
  token: string;
  setToken(newToken: string): void;
}

interface TokenProviderProps {
  children: React.ReactNode;
}

export const ContextComponent = createContext({} as UseTokenType);

export const routes = {
  public: ["/login", "/"],
  private: ["/socialProjects"],
};

export function TokenProvider({ children }: Readonly<TokenProviderProps>) {
  const [token, setToken] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log("token", token);

  const hasSomeValidRoute = useCallback((redirectTo: string) => {
    return (
      redirectTo.includes(routes.public[1]) ||
      routes.private.some((privateRoute) => redirectTo.includes(privateRoute))
    );
  }, []);

  const gotoStartPage = useCallback(() => {
    router.push("/socialProjects");
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentToken = localStorage.getItem("sessionToken") ?? "";
      const redirectTo = searchParams.get("redirectTo") ?? "";

      const dontHaveToken =
        currentToken === "" ||
        currentToken === undefined ||
        currentToken === null;

      const haveToken =
        currentToken !== "" &&
        currentToken !== undefined &&
        currentToken !== null;

      if (
        dontHaveToken &&
        routes.public.every((publicRoute) => publicRoute !== pathname)
      ) {
        redirect(`/login?redirectTo=${window.location.href}`);
      } else if (haveToken && pathname === "/login") {
        if (hasSomeValidRoute(redirectTo)) {
          router.push(redirectTo);
        } else {
          gotoStartPage();
        }
      } else if (haveToken && pathname === "/") {
        gotoStartPage();
      } else if (token === "") {
        setToken(currentToken);
      }
    }
  }, [token, pathname, router, searchParams, hasSomeValidRoute, gotoStartPage]);

  const setUserToken = useCallback(async (tokenValue: string) => {
    console.log("func", tokenValue);

    if (typeof window !== "undefined") {
      localStorage.setItem("sessionToken", tokenValue);
    }

    setToken(tokenValue);
  }, []);

  const value = useMemo(() => {
    return {
      token,
      setToken: setUserToken,
    };
  }, [setUserToken, token]);

  return (
    <Suspense>
      <ContextComponent.Provider value={value}>
        {token === "" &&
        routes.public.every((publicRoute) => publicRoute !== pathname)
          ? null
          : children}
      </ContextComponent.Provider>
    </Suspense>
  );
}

export const useToken = () => {
  return useContext(ContextComponent);
};
