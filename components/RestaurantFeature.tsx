"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RestaurantCard, Meal as CardMeal } from "./RestaurantCard";
import { Modal } from "@/components/ui/modal";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import {
  RestaurantMealForm,
  MealFormValues,
} from "@/components/RestaurantMealForm";
import { fetchApi } from "@/lib/fetchApi";
import { Button } from "./ui/button";

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
  const [deleteCandidate, setDeleteCandidate] = useState<Meal | null>(null);
  const [mealList, setMealList] = useState<Meal[]>(meals);

  const handleMoreClick = (id: string) => {
    setPopoverOpenId(popoverOpenId === id ? null : id);
  };
  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
    setPopoverOpenId(null);
  };
  const handleDelete = (meal: Meal) => {
    // Prompt for delete confirmation
    setDeleteCandidate(meal);
    setPopoverOpenId(null);
  };
  const confirmDelete = async () => {
    if (deleteCandidate) {
      await fetchApi(`${API_URL}/${deleteCandidate.id}`, { method: "DELETE" });
      setMealList((prev) => prev.filter((m) => m.id !== deleteCandidate.id));
      setNotification("Meal deleted successfully");
      setDeleteCandidate(null);
    }
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
            <RestaurantCard
              key={meal.id}
              meal={meal as CardMeal}
              popoverOpenId={popoverOpenId}
              onMoreClick={handleMoreClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button>Load More</Button>
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
        {notification && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md">
            {notification}
          </div>
        )}
        {/* Delete confirmation modal */}
        {deleteCandidate && (
          <Modal
            isOpen={Boolean(deleteCandidate)}
            onClose={() => setDeleteCandidate(null)}
            title="Confirm Delete"
            footer={
              <>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteCandidate(null)}
                >
                  Cancel
                </Button>
                <Button onClick={confirmDelete}>Delete</Button>
              </>
            }
          >
            <p>Are you sure you want to delete "{deleteCandidate.name}"?</p>
          </Modal>
        )}
      </div>
    </section>
  );
}
