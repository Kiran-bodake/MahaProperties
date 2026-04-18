"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService }  from "@/services/auth.service";
import toast from "react-hot-toast";

export function useAuth() {
  const { user, token, setUser, setToken, logout, isLoading, setLoading } = useAuthStore();
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async (phone: string) => {
    setLoading(true);
    try {
      await authService.sendOTP(phone);
      setOtpSent(true);
      toast.success("OTP sent to your mobile");
    } catch { toast.error("Failed to send OTP."); }
    finally  { setLoading(false); }
  };

  const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      const session = await authService.verifyOTP(phone, otp);
      setUser(session.user);
      setToken(session.token);
      toast.success(`Welcome${session.user.name ? ", " + session.user.name : ""}!`);
      return true;
    } catch { toast.error("Invalid OTP."); return false; }
    finally  { setLoading(false); }
  };

  const handleLogout = async () => {
    await authService.logout().catch(() => {});
    logout();
    toast.success("Logged out");
  };

  return { user, token, isLoading, isAuthenticated: !!user, otpSent, sendOTP, verifyOTP, logout: handleLogout };
}
