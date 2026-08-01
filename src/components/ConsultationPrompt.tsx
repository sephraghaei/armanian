import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

const LOCAL_STORAGE_KEY = "consultation_prompt_dismissed";
const DELAY_MS = 15000;

const ConsultationPrompt = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (localStorage.getItem(LOCAL_STORAGE_KEY)) return;
    } catch {
      /* ignore storage errors */
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(LOCAL_STORAGE_KEY, "true"); } catch { /* ignore */ }
    setOpen(false);
  };

  const handleAccept = () => {
    dismiss();
    const scrollToContact = () => {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToContact, 80);
    } else {
      scrollToContact();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="پیشنهاد مشاوره رایگان"
      className="fixed bottom-6 right-6 z-40 w-[min(20rem,calc(100vw-3rem))] animate-slide-in-up"
    >
      <div className="relative rounded-2xl border border-border bg-card p-5 shadow-lifted">
        <Button
          variant="ghost"
          size="icon"
          aria-label="بستن پیشنهاد مشاوره"
          onClick={dismiss}
          className="absolute left-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground">مشاوره رایگان می‌خوای؟</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              برای انتخاب دوره مناسب، رایگان راهنمایی‌ت می‌کنیم.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1" onClick={handleAccept}>
            بله، راهنمایی می‌خوام
          </Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={dismiss}>
            بعداً
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPrompt;
