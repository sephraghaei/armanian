import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, SearchX, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <div className="text-center max-w-md mx-auto animate-page-in">
        {/* Visual */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-soft">
          <SearchX className="h-9 w-9 text-muted-foreground" aria-hidden="true" />
        </div>

        <p className="text-sm font-medium text-accent mb-2">خطای ۴۰۴</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          متأسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا آدرس آن تغییر کرده است.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/">
              <Home className="h-4 w-4" />
              بازگشت به خانه
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="/#contact">
              <Phone className="h-4 w-4" />
              تماس با ما
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
