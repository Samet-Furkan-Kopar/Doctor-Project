"use client";
import { useRouter } from "next/router";
import React from "react";
import ResetPassword from "../../components/forgot-password/reset-password";

export default function ResetPasswordPage() {
  const router = useRouter();
  const id = router.query.id;
  return <ResetPassword />;
}
