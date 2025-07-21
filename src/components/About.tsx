import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To inspire and educate the next generation of programmers and digital innovators through engaging, age-appropriate learning experiences.'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Our certified teachers combine technical expertise with child development knowledge to create the perfect learning environment.'
    },
    {
      icon: Award,
      title: 'Recognized Excellence',
      description: 'Accredited programs and internationally recognized certifications including ICDL that prepare kids for the digital future.'
    },
    {
      icon: Lightbulb,
      title: 'Creative Learning',
      description: 'We blend coding with creativity, making learning fun through games, projects, and interactive challenges that spark imagination.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About CodeKids Academy
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're more than just a coding school. We're a community dedicated to nurturing young talent, 
            building confidence, and preparing children for a technology-driven future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 bg-gradient-hero rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Age-appropriate curriculum designed by education experts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Small class sizes for personalized attention</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Modern facilities with latest technology</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Regular progress tracking and parent updates</span>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5+</div>
              <div className="text-lg text-muted-foreground mb-4">Years of Excellence</div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">95%</div>
              <div className="text-lg text-muted-foreground">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;