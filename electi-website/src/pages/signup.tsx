import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    window.location.replace("https://app.electi.sa/login");
  }, []);
  return null;
}
