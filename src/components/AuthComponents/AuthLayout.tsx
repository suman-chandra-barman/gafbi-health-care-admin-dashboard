/** @format */
import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Gafbi Health Care"
              width={60}
              height={60}
              className="w-14 h-14"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-tertiary">{subtitle}</p>}
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
