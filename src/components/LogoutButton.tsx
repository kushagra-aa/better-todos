"use client";

import { LogOut } from "lucide-react";
import Button from "./ui/Button";
import { handleLogout } from "@/lib/actions/auth";
import { useState } from "react";
import Loader from "./ui/Loader";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandler = async () => {
    setIsLoading(true);
    await handleLogout().then(() => setIsLoading(false));
  };
  return (
    <Button
      title="Logout"
      className="absolute bottom-8 right-8 active:outline-0 active:border-0 focus:outline-0 focus:border-0"
      variant="danger"
      onClick={logoutHandler}
    >
      {isLoading ? <Loader size="xs" /> : <LogOut />}
    </Button>
  );
}

export default LogoutButton;
