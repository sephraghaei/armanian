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

const DepartmentCard = ({ title, description, icon: Icon, image, courses, onLearnMore }: DepartmentCardProps) => {
  return (
    <div className="w-[350px] shrink-0">
      <Card className="h-full border-border/50 bg-card overflow-hidden group hover:shadow-glow-primary transition-all duration-300 flex flex-col">
        {/* Department Image with Title */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground drop-shadow-lg">{title}</h3>
            </div>
          </div>
        </div>
        
        {/* Courses List - Fixed Height with Scroll */}
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="space-y-2 flex-1 overflow-y-auto scrollbar-thin pr-2 mb-4" style={{ maxHeight: '240px' }}>
            {courses.map((course, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors group/item cursor-pointer"
                onClick={onLearnMore}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-sm text-foreground text-right">{course}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* Action Button - Always at Bottom */}
          <Button 
            variant="default" 
            className="w-full group/btn mt-auto"
            onClick={onLearnMore}
          >
            <span>مشاهده همه دوره‌ها</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentCard;
