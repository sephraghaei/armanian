import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LucideIcon } from 'lucide-react';

interface DepartmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  courses: string[];
  onLearnMore: () => void;
}

const DepartmentCard = ({ title, description, icon: Icon, courses, onLearnMore }: DepartmentCardProps) => {
  return (
    <div className="h-full w-full">
      <Card className="group flex h-full flex-col overflow-hidden border-border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lifted">
        <CardContent className="flex flex-1 flex-col gap-5 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary">
            <Icon className="h-5 w-5 text-foreground" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>

          {/* Courses List */}
          <div className="flex-1 space-y-1">
            {courses.map((course, idx) => (
              <button
                key={idx}
                type="button"
                className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-right transition-colors duration-150 hover:bg-secondary"
                onClick={onLearnMore}
              >
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                <span className="text-sm text-foreground/80">{course}</span>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-auto w-full bg-card"
            onClick={onLearnMore}
          >
            مشاهده همه دوره‌ها
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


export default DepartmentCard;
