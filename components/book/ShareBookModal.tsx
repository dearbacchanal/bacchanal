"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Facebook, Twitter, Share2, Check, Loader2, ExternalLink } from "lucide-react";

interface ShareBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareBookModal({ isOpen, onClose }: ShareBookModalProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generateShareLink();
    }
  }, [isOpen]);

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/templates/share", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setShareUrl(data.shareUrl);
        setIsPublic(data.isPublic);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to generate share link");
      }
    } catch (error) {
      console.error("Error generating share link:", error);
      toast.error("Failed to generate share link");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const text = "Check out my Carnival Book! 🎉";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToWhatsApp = () => {
    const text = `Check out my Carnival Book! 🎉 ${shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const togglePrivacy = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/templates/share", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublic: !isPublic }),
      });

      if (response.ok) {
        setIsPublic(!isPublic);
        toast.success(
          !isPublic
            ? "Book is now public - anyone with the link can view it"
            : "Book is now private - link is disabled"
        );
      } else {
        toast.error("Failed to update privacy settings");
      }
    } catch (error) {
      toast.error("Failed to update privacy settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Your Carnival Book</DialogTitle>
          <DialogDescription>
            Share your carnival memories with friends and family
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Book Privacy</h3>
              <p className="text-xs text-muted-foreground">
                {isPublic
                  ? "Anyone with the link can view your book"
                  : "Your book is private"}
              </p>
            </div>
            <Button
              variant={isPublic ? "default" : "outline"}
              size="sm"
              onClick={togglePrivacy}
              disabled={isLoading}
            >
              {isPublic ? "Public" : "Private"}
            </Button>
          </div>

          {/* Share Link */}
          {isGenerating ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-coral" />
            </div>
          ) : shareUrl && isPublic ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Share Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    onClick={(e) => e.currentTarget.select()}
                    className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-coral"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="flex-shrink-0"
                    title="Copy Link"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(shareUrl, "_blank")}
                    className="flex-shrink-0"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Share On</label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={shareToFacebook}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    onClick={shareToTwitter}
                    className="flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={shareToWhatsApp}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">
                Make your book public to generate a share link
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}