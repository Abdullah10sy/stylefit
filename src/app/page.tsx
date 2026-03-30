"use client";
import React from "react";
import { useStore } from "./store";
import { Nav } from "@/components/Nav";
import { Hero, Footer } from "@/components/Hero";
import { Login } from "@/components/Login";
import { Dashboard } from "@/components/Dashboard";
import { Results, Saved } from "@/components/Results";
import { CartDrawer } from "@/components/CartDrawer";
import { Payment } from "@/components/Payment";
import { Chat } from "@/components/Chat";

export default function Home() {
  const { state, toastMsg } = useStore();

  return (
    <>
      <Nav />
      {state.activeSection === "hero" && <Hero />}
      <Login />
      <Dashboard />
      <Results />
      <Saved />
      <Payment />
      
      <CartDrawer />
      <Chat />
      
      <Footer />

      {/* Global Toast */}
      {toastMsg && (
        <div className="toast">
          {toastMsg}
        </div>
      )}
    </>
  );
}
