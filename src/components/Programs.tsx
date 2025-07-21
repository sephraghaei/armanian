import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Star } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      title: 'Beginner Explorer',
      description: 'Perfect first step into the world of programming for young learners.',
      price: '$120',
      duration: '8 weeks',
      level: 'Beginner',
      ages: '6-9 years',
      classSize: '8 students',
      features: [
        'Scratch visual programming',
        'Basic computer skills',
        'Creative problem solving',
        'Interactive games and projects',
        'Certificate of completion'
      ],
      popular: false
    },
    {
      title: 'Code Adventurer',
      description: 'Comprehensive programming course for intermediate young coders.',
      price: '$200',
      duration: '12 weeks',
      level: 'Intermediate',
      ages: '10-13 years',
      classSize: '10 students',
      features: [
        'Python programming basics',
        'Web development introduction',
        'Game development projects',
        'Team collaboration skills',
        'Portfolio creation',
        'Industry mentor sessions'
      ],
      popular: true
    },
    {
      title: 'Future Developer',
      description: 'Advanced program preparing teens for real-world development.',
      price: '$300',
      duration: '16 weeks',
      level: 'Advanced',
      ages: '14-16 years',
      classSize: '6 students',
      features: [
        'Full-stack web development',
        'Mobile app development',
        'AI and machine learning intro',
        'Real client projects',
        'Internship opportunities',
        'University preparation',
        'ICDL certification'
      ],
      popular: false
    }
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Structured programs designed to take your child from coding curiosity to confident creator. 
            Each path is carefully crafted for different age groups and skill levels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className={`relative hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-2 ${program.popular ? 'border-primary shadow-glow-primary' : ''}`}>
              {program.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-primary text-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl text-foreground">{program.title}</CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{program.price}</div>
                    <div className="text-sm text-muted-foreground">per course</div>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground">
                  {program.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.classSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{program.ages}</span>
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={program.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {program.popular ? "Start Learning" : "Choose Program"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-gradient-hero rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still Not Sure? 
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free consultation with our education specialists to find the perfect program for your child's interests and skill level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Book Free Consultation
            </Button>
            <Button variant="outline" size="lg">
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;