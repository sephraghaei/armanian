import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const LOCAL_STORAGE_KEY = "consultation_prompt_dismissed";

const ConsultationPrompt = () => {
  const getInitialOpen = () => {
    try {
      const dismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
      return !dismissed;
    } catch {
      return true;
    }
  };
  const [open, setOpen] = useState<boolean>(getInitialOpen);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAccept = () => {
    try { localStorage.setItem(LOCAL_STORAGE_KEY, "true"); } catch {}
    setOpen(false);
    // Scroll to contact section on the home page
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // allow navigation to commit, then scroll
      setTimeout(() => {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } else {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDismiss = () => {
    try { localStorage.setItem(LOCAL_STORAGE_KEY, "true"); } catch {}
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>مشاوره می‌خوای؟</AlertDialogTitle>
          <AlertDialogDescription>
            برای انتخاب دوره مناسب، می‌تونیم رایگان راهنمایی‌ت کنیم. دوست داری همین الان ارتباط بگیری؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDismiss}>بعدا</AlertDialogCancel>
          <AlertDialogAction onClick={handleAccept}>بله، راهنمایی می‌خوام</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConsultationPrompt;


