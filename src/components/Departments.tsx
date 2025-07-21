import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Gamepad2, Palette, Globe, Brain, Monitor, ArrowRight } from 'lucide-react';

const Departments = () => {
  const departments = [
    {
      icon: Code,
      title: 'Programming Fundamentals',
      description: 'Learn the basics of coding with Python, JavaScript, and Scratch programming languages.',
      age: '8-16 years',
      duration: '12 weeks',
      highlights: ['Visual Programming', 'Text-based Coding', 'Problem Solving', 'Logic Building']
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      description: 'Create amazing games using Unity, Roblox, and other game development platforms.',
      age: '10-16 years',
      duration: '16 weeks',
      highlights: ['2D/3D Games', 'Game Design', 'Character Animation', 'Level Design']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Build websites and web applications using HTML, CSS, and JavaScript.',
      age: '12-16 years',
      duration: '14 weeks',
      highlights: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Web Publishing']
    },
    {
      icon: Palette,
      title: 'Digital Design',
      description: 'Learn graphic design, UI/UX principles, and creative digital art.',
      age: '10-16 years',
      duration: '10 weeks',
      highlights: ['Graphic Design', 'UI/UX Basics', 'Digital Art', 'Creative Tools']
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Introduction to artificial intelligence and machine learning concepts for kids.',
      age: '13-16 years',
      duration: '12 weeks',
      highlights: ['AI Basics', 'Data Science', 'Machine Learning', 'Future Tech']
    },
    {
      icon: Monitor,
      title: 'ICDL Certification',
      description: 'International Computer Driving License - Essential digital skills certification.',
      age: '8-16 years',
      duration: '8 weeks',
      highlights: ['Computer Basics', 'Office Applications', 'Internet Safety', 'Digital Literacy']
    }
  ];

  return (
    <section id="departments" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Departments
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of technology and programming courses 
            designed to inspire and educate young minds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <Card key={index} className="group hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 border-border/50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <dept.icon className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {dept.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {dept.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-accent font-medium">Age: {dept.age}</span>
                  <span className="text-primary font-medium">Duration: {dept.duration}</span>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">What You'll Learn:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {dept.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Departments;