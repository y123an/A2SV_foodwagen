"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import {
  RestaurantMealForm,
  MealFormValues,
} from "@/components/RestaurantMealForm";
import { fetchApi } from "@/lib/fetchApi";

const API_URL = "https://6852821e0594059b23cdd834.mockapi.io/Food";

type Meal = {
  id: string;
  name: string;
  avatar?: string;
  rating?: string;
  open?: boolean;
  logo?: string;
  price?: string;
  Price?: string;
  restaurant_name?: string;
  image?: string;
};

interface FeatureProps {
  meals: Meal[];
}

export default function Feature({ meals }: FeatureProps) {
  const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [mealList, setMealList] = useState<Meal[]>(meals);

  const handleMoreClick = (id: string) => {
    setPopoverOpenId(popoverOpenId === id ? null : id);
  };
  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
    setPopoverOpenId(null);
  };
  const handleDelete = async (meal: Meal) => {
    await fetchApi(`${API_URL}/${meal.id}`, { method: "DELETE" });
    setMealList((prev) => prev.filter((m) => m.id !== meal.id));
    setPopoverOpenId(null);
    setNotification("Meal deleted successfully");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };
  const handleSubmit = async (data: MealFormValues) => {
    if (selectedMeal) {
      await fetchApi(`${API_URL}/${selectedMeal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setIsModalOpen(false);
    setSelectedMeal(null);
    setNotification("Meal updated successfully");
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container md:max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Meals</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mealList.map((meal) => (
            <Card
              key={meal.id}
              className="relative overflow-hidden rounded-lg shadow-md"
            >
              <div className="absolute top-2 left-2 bg-base text-white text-xs font-bold px-2 py-1 rounded z-50">
                ${meal.price || meal.Price || "0.00"}
              </div>
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={meal.avatar || meal.image || "/placeholder.png"}
                    alt={meal.name}
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              </CardContent>

              <div className="flex items-center justify-between px-4 py-2">
                <Image
                  src={meal.logo || "/logo-placeholder.png"}
                  alt="logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <div className="relative">
                  <FiMoreVertical
                    className="text-gray-500 cursor-pointer"
                    onClick={() => handleMoreClick(meal.id)}
                  />
                  {popoverOpenId === meal.id && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                      <button
                        onClick={() => handleEdit(meal)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(meal)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {meal.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <AiFillStar className="text-yellow-500 mr-1" size={14} />
                  {meal.rating}
                </div>
                <span
                  className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                    meal.open
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {meal.open ? "Open" : "Closed"}
                </span>
              </div>
            </Card>
          ))}
        </div>
        {isModalOpen && selectedMeal && (
          <Modal isOpen={isModalOpen} onClose={handleCancel} title="Edit Meal">
            <RestaurantMealForm
              initialData={{
                food_name: selectedMeal.name,
                food_image: selectedMeal.avatar || selectedMeal.image || "",
                food_rating: selectedMeal.rating
                  ? Number(selectedMeal.rating)
                  : 1,
                restaurant_name: selectedMeal.restaurant_name || "",
                restaurant_image: selectedMeal.logo || "",
                restaurant_status: selectedMeal.open ? "Open Now" : "Closed",
              }}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Modal>
        )}
        {/* Render notification toast */}
        {notification && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md">
            {notification}
          </div>
        )}
      </div>
    </section>
  );
}
