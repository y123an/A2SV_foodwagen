import React from "react";
import { Card } from "./card";
import { CardHeader } from "./card";
import { CardTitle } from "./card";
import { CardContent } from "./card";
import { CardFooter } from "./card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center ">
      <Card className={className || "w-full max-w-md"}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
        {footer && (
          <CardFooter className="flex justify-end space-x-2">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
