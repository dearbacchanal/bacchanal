"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
    isOpen: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to initiate payment");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-md bg-white border-2 border-primary/20 shadow-2xl rounded-3xl overflow-hidden p-0">
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-8 sm:p-10">
                    <DialogHeader className="mb-6">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-bounce">
                            <CreditCard className="w-8 h-8 text-primary" />
                        </div>
                        <DialogTitle className="text-3xl font-display text-center text-foreground mb-4">
                            Unlock Your Carnival Book
                        </DialogTitle>
                        <DialogDescription className="text-center text-muted-foreground text-lg font-body leading-relaxed">
                            Start editing and customizing your memories with our premium book builder for a one-time fee of <span className="font-bold text-primary">$20</span>.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                            <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                            <p className="text-sm font-body text-foreground/80">
                                Unlimited text editing and photo curation
                            </p>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                            <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                            <p className="text-sm font-body text-foreground/80">
                                Unlock all premium templates and layouts
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl transition-all active:scale-[0.98] group"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Preparing Checkout...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 justify-center">
                                    Pay $20 & Start Editing
                                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </div>
                            )}
                        </Button>

                        <p className="text-[10px] text-center text-muted-foreground font-body">
                            Secure payment via Stripe. One-time fee, no subscriptions.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
