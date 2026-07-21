import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';

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
    <div className="w-[340px] shrink-0">
      <Card className="h-full border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* Illustration Header */}
        <div className="relative h-44 bg-primary/5 flex items-center justify-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-4 left-6 w-16 h-16 rounded-full border-2 border-primary/10 animate-pulse" />
          <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full bg-primary/10" />
          <div className="absolute top-10 right-12 w-6 h-6 rounded-full bg-primary/8" />

          {/* Main icon */}
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 flex-1 flex flex-col space-y-5">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Courses List */}
          <div className="space-y-2.5 flex-1">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                onClick={onLearnMore}
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-sm text-foreground/85">{course}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <Button
            variant="outline"
            className="w-full mt-auto"
            onClick={onLearnMore}
          >
            مشاهده همه دوره‌ها
            <ArrowRight className="w-4 h-4 mr-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentCard;
