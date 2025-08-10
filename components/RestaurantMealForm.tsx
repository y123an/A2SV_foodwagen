"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const mealSchema = z.object({
  food_name: z.string().nonempty("Food name is required"),
  food_rating: z
    .number({ invalid_type_error: "Food rating must be a number" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  food_image: z.string().url("Invalid URL").nonempty("Image URL is required"),
  restaurant_name: z.string().nonempty("Restaurant name is required"),
  restaurant_image: z
    .string()
    .url("Invalid URL")
    .nonempty("Image URL is required"),
  restaurant_status: z.enum(["Open Now", "Closed"]),
});

export type MealFormValues = z.infer<typeof mealSchema>;

interface MealFormProps {
  initialData?: Partial<MealFormValues>;
  onSubmit: (data: MealFormValues) => void;
  onCancel: () => void;
}

export function RestaurantMealForm({
  initialData,
  onSubmit,
  onCancel,
}: MealFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      food_name: initialData?.food_name || "",
      food_rating: initialData?.food_rating || 1,
      food_image: initialData?.food_image || "",
      restaurant_name: initialData?.restaurant_name || "",
      restaurant_image: initialData?.restaurant_image || "",
      restaurant_status: initialData?.restaurant_status || "Open Now",
    },
  });

  const onFormSubmit = (data: MealFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Input
          id="food_name"
          {...register("food_name")}
          placeholder="Enter food name"
        />
        {errors.food_name && (
          <p id="food_name-error" className="text-red-600 mt-1">
            {errors.food_name.message}
          </p>
        )}
      </div>
      <div>
        <Input
          id="food_rating"
          type="number"
          {...register("food_rating", { valueAsNumber: true })}
          min={1}
          max={5}
        />
        {errors.food_rating && (
          <p id="food_rating-error" className="text-red-600 mt-1">
            {errors.food_rating.message}
          </p>
        )}
      </div>
      <div>
        <Input
          id="food_image"
          {...register("food_image")}
          placeholder="Enter food image URL"
        />
        {errors.food_image && (
          <p id="food_image-error" className="text-red-600 mt-1">
            {errors.food_image.message}
          </p>
        )}
      </div>
      <div>
        <Input
          id="restaurant_name"
          {...register("restaurant_name")}
          placeholder="Enter restaurant name"
        />
        {errors.restaurant_name && (
          <p id="restaurant_name-error" className="text-red-600 mt-1">
            {errors.restaurant_name.message}
          </p>
        )}
      </div>
      <div>
        <Input
          id="restaurant_image"
          {...register("restaurant_image")}
          placeholder="Enter image URL"
        />
        {errors.restaurant_image && (
          <p id="restaurant_image-error" className="text-red-600 mt-1">
            {errors.restaurant_image.message}
          </p>
        )}
      </div>
      <div>
        <select
          id="restaurant_status"
          {...register("restaurant_status")}
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="Open Now">Open Now</option>
          <option value="Closed">Closed</option>
        </select>
        {errors.restaurant_status && (
          <p id="restaurant_status-error" className="text-red-600 mt-1">
            {errors.restaurant_status.message}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Save" : "Add"}</Button>
      </div>
    </form>
  );
}
