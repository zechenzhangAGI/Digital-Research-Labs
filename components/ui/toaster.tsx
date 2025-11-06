"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import * as React from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
}

const toastTimeouts = new Map<string, NodeJS.Timeout>();

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { id, ...props };
    
    setToasts((prev) => [...prev, newToast]);

    if (props.duration !== Infinity) {
      const timeout = setTimeout(() => {
        dismiss(id);
      }, props.duration || 3000);
      
      toastTimeouts.set(id, timeout);
    }

    return {
      id,
      dismiss: () => dismiss(id),
    };
  };

  const dismiss = (id: string) => {
    const timeout = toastTimeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeouts.delete(id);
    }
    
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toasts,
    toast,
    dismiss,
  };
}

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate-slide-up bg-background"
        >
          <div className="grid gap-1">
            {toast.title && (
              <div className="text-sm font-semibold">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
          </div>
          {toast.action}
          <button
            onClick={() => dismiss(toast.id)}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
