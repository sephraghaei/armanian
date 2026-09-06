import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Departments from '@/components/Departments';
import Programs from '@/components/Programs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div>
        <Header />
        <Hero />
        <Departments />
        <Programs />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
