import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Placeholder sections - to be built next */}
        <section id="about" className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">About section coming soon...</p>
        </section>
        
        <section id="experience" className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Experience section coming soon...</p>
        </section>
        
        <section id="projects" className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Projects section coming soon...</p>
        </section>
        
        <section id="skills" className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Skills section coming soon...</p>
        </section>
        
        <section id="contact" className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Contact section coming soon...</p>
        </section>
      </main>
    </div>
  );
};

export default Index;
