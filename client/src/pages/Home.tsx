import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const courses = [
    {
      id: "agents",
      title: "Agentes de Inteligencia Artificial",
      description: "Aprende los fundamentos, frameworks y evaluación de agentes de IA. Basado en el curso de Hugging Face Learn.",
      units: 4,
      icon: Brain,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-slate-900 dark:text-white" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Learn</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Aprende sobre Inteligencia Artificial con contenido estructurado y detallado
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <Card
                key={course.id}
                className="border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setLocation(`/course/${course.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{course.title}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {course.units} unidades de contenido
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 mt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
            © 2025 Learn. Contenido educativo basado en recursos de Hugging Face Learn.
          </p>
        </div>
      </footer>
    </div>
  );
}

