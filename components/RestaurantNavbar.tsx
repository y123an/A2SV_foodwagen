"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  RestaurantMealForm,
  MealFormValues,
} from "@/components/RestaurantMealForm";
import { fetchApi } from "@/lib/fetchApi";

const API_URL = "https://6852821e0594059b23cdd834.mockapi.io/Food";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const handleOpenAdd = () => {
    setIsEditing(false);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
  };
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  return (
    <>
      {/* Notification toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md">
          {notification}
        </div>
      )}
      <nav className="flex items-center justify-center p-4 bg-white">
        <div className="md:max-w-7xl flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" className="w-[28px]" />
            <div className="text-[20px] font-bold">
              Food<span>Wagen</span>
            </div>
          </div>
          <div>
            <Button className="px-5" onClick={handleOpenAdd}>
              Add Meal
            </Button>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={isEditing ? "Edit meal" : "Add a meal"}
      >
        <RestaurantMealForm
          initialData={isEditing ? ({} as MealFormValues) : undefined}
          onSubmit={async (data: MealFormValues) => {
            if (!isEditing) {
              await fetchApi(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              setNotification("Meal added successfully");
            }
            handleClose();
          }}
          onCancel={handleClose}
        />
      </Modal>
    </>
  );
}
