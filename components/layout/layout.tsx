import { ReactNode } from "react";
import MainNavigation from "./mainNavigation";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
