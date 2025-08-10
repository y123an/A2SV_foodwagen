"use client";

import React from "react";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { Card, CardContent } from "@/components/ui/card";

export type Meal = {
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

interface RestaurantCardProps {
  meal: Meal;
  popoverOpenId: string | null;
  onMoreClick: (id: string) => void;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
}

export function RestaurantCard({
  meal,
  popoverOpenId,
  onMoreClick,
  onEdit,
  onDelete,
}: RestaurantCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md">
      <div className="absolute top-2 left-2 bg-base text-white text-xs font-bold px-2 py-1 rounded z-30">
        ${meal.price || meal.Price || "0.00"}
      </div>
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={meal.avatar || meal.image || "/placeholder.png"}
            alt={meal.name}
            fill
            className="object-cover"
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
            onClick={() => onMoreClick(meal.id)}
          />
          {popoverOpenId === meal.id && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
              <button
                onClick={() => onEdit(meal)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(meal)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        <h3 className="font-semibold text-lg text-gray-800">{meal.name}</h3>
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
  );
}
