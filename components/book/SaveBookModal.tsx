"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SaveBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSaveSuccess?: () => void;
}

export function SaveBookModal({ isOpen, onClose, onOpen, onSaveSuccess }: SaveBookModalProps) {
  // ... existing state ...
  const [bookName, setBookName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const { openModal } = useAuthModal();
  const router = useRouter();
  const previousAuthState = useRef(isAuthenticated);

  // ... existing effects ...
  // Load existing book name when modal opens
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      const loadExistingBook = async () => {
        try {
          const response = await fetch("/api/templates");
          if (response.ok) {
            const { templates } = await response.json();
            if (templates && templates.length > 0) {
              setBookName(templates[0].bookName);
            }
          }
        } catch (error) {
          console.error("Error loading existing book:", error);
        }
      };
      loadExistingBook();
    }
  }, [isOpen, isAuthenticated]);

  // Watch for authentication changes
  useEffect(() => {
    // If user just logged in (auth changed from false to true) and we're waiting for auth
    if (!previousAuthState.current && isAuthenticated && !isLoading && waitingForAuth) {
      // Reopen the save modal after successful login
      setWaitingForAuth(false);
      onOpen();
      toast.success("Login successful! You can now save your book.");
    }
    previousAuthState.current = isAuthenticated;
  }, [isAuthenticated, isLoading, waitingForAuth, onOpen]);

  const handleSave = async () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      setWaitingForAuth(true);
      onClose(); // Close the save modal
      openModal("signup"); // Open auth modal
      return;
    }

    if (!bookName.trim()) {
      toast.error("Please enter a book name");
      return;
    }

    setIsSaving(true);
    setWaitingForAuth(false);

    try {
      // Fetch current images
      const imagesResponse = await fetch("/api/book-images");
      const { images } = await imagesResponse.json();

      // Fetch current text data
      const dataResponse = await fetch("/api/book-data");
      const { data: textData } = await dataResponse.json();

      // Save the template
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookName: bookName.trim(),
          images,
          textData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || "Book saved successfully!");
        onClose();

        // Trigger success callback
        if (onSaveSuccess) {
          onSaveSuccess();
        }

        // Data stays in the book page - user can continue editing
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save book");
      }
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Your Carnival Book</DialogTitle>
          <DialogDescription>
            Give your book a name and save it to your templates
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bookName">Book Name</Label>
            <Input
              id="bookName"
              placeholder="e.g., Trinidad Carnival 2026"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              disabled={isSaving}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSaving) {
                  handleSave();
                }
              }}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !bookName.trim()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-coral via-teal to-yellow text-white font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? "Saving..." : "Save Book"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}