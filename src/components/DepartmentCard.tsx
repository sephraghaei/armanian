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
    <div className="w-[380px] shrink-0">
      <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all duration-500 flex flex-col">
        {/* Department Image with Title */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 brightness-90 group-hover:brightness-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-6 right-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground drop-shadow-2xl">{title}</h3>
            </div>
          </div>
        </div>
        
        {/* Courses List - Fixed Height with Scroll */}
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="space-y-1.5 flex-1 overflow-y-auto pr-2 mb-6 custom-scrollbar" style={{ maxHeight: '220px' }}>
            {courses.map((course, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-200 group/item cursor-pointer"
                onClick={onLearnMore}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-2 h-2 bg-gradient-primary rounded-full flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                  <span className="text-sm font-medium text-foreground/90 group-hover/item:text-foreground text-right">{course}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary/60 opacity-0 group-hover/item:opacity-100 group-hover/item:-translate-x-1 transition-all flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* Action Button - Always at Bottom */}
          <Button 
            variant="default" 
            className="w-full group/btn mt-auto shadow-md hover:shadow-lg"
            onClick={onLearnMore}
          >
            <span>مشاهده همه دوره‌ها</span>
            <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentCard;
