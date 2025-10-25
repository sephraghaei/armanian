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
    <div className="w-[380px] shrink-0 group/card">
      <Card className="h-full border-border/40 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-md overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-3 hover:rotate-1 transition-all duration-700 flex flex-col relative animate-fade-in-up">
        {/* Department Image with Title */}
        <div className="relative h-64 overflow-hidden rounded-t-lg group/image">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-125 brightness-85 group-hover:brightness-100 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/10 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-all duration-800" />
          
          {/* Animated floating elements */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-100" />
          <div className="absolute top-8 left-8 w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-200" />
          <div className="absolute top-12 left-12 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-900 delay-300" />
          
          {/* Sparkle effects */}
          <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-1000 delay-400" />
          <div className="absolute top-10 right-10 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-1200 delay-500" />
          
          <div className="absolute bottom-6 right-6 flex items-center gap-4 group/content">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-primary/50 transition-all duration-500 ease-out ring-4 ring-primary/20 group-hover:ring-primary/60 group-hover:ring-8">
              <Icon className="w-8 h-8 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1 group-hover:translate-x-2 transition-transform duration-500">
              <h3 className="text-xl font-black text-white drop-shadow-2xl mb-1 group-hover:text-primary/20 transition-colors duration-500">{title}</h3>
              <p className="text-sm text-white/80 font-medium drop-shadow-lg group-hover:text-white transition-colors duration-500">{description}</p>
            </div>
          </div>
        </div>
        
        {/* Courses List - Fixed Height with Scroll */}
        <CardContent className="p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-card/20">
          <div className="space-y-2 flex-1 mb-6">
            {courses.map((course, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/15 border border-transparent hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group/item cursor-pointer relative overflow-hidden"
                onClick={onLearnMore}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-accent/8 opacity-0 group-hover/item:opacity-100 transition-all duration-500" />
                
                {/* Floating particles */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover/item:opacity-100 group-hover/item:animate-ping transition-all duration-700" />
                
                <div className="flex items-center gap-3 flex-1 relative z-10">
                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full flex-shrink-0 group-hover/item:scale-150 group-hover/item:shadow-xl group-hover/item:rotate-180 transition-all duration-500 ease-out" />
                  <span className="text-sm font-bold text-foreground/90 group-hover/item:text-foreground text-right group-hover/item:font-black group-hover/item:scale-105 transition-all duration-500">{course}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary/60 opacity-0 group-hover/item:opacity-100 group-hover/item:-translate-x-2 group-hover/item:text-primary group-hover/item:scale-110 transition-all duration-500 flex-shrink-0 relative z-10" />
              </div>
            ))}
          </div>

          {/* Action Button - Always at Bottom */}
          <Button 
            variant="default" 
            className="w-full group/btn mt-auto shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-accent hover:to-primary text-white font-bold py-4 rounded-xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
            onClick={onLearnMore}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            
            {/* Floating particles */}
            <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-ping transition-all duration-700" />
            <div className="absolute bottom-2 right-4 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-ping transition-all duration-900 delay-200" />
            
            <span className="relative z-10 group-hover/btn:scale-105 transition-transform duration-300">مشاهده همه دوره‌ها</span>
            <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:-translate-x-2 group-hover/btn:rotate-12 transition-all duration-500 relative z-10" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentCard;
