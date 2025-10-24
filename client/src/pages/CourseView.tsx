import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useEffect, useState } from "react";

interface Unit {
  id: string;
  title: string;
  content: string;
}

interface Course {
  id: string;
  title: string;
  units: Unit[];
}

const courseData: Record<string, Course> = {
  agents: {
    id: "agents",
    title: "Agentes de Inteligencia Artificial",
    units: [
      {
        id: "unit1",
        title: "Fundamentos del Agente",
        content: `
## ¿Qué es un Agente de IA?

Un Agente de IA es un **modelo capaz de razonar, planificar e interactuar con su entorno** para alcanzar un objetivo definido por el usuario. Se dice que tiene *agencia* porque tiene la capacidad de interactuar con el entorno de forma autónoma.

### Definición Formal

Un Agente es un sistema que aprovecha un modelo de IA para interactuar con su entorno con el fin de lograr un objetivo definido. Combina razonamiento, planificación y la ejecución de acciones (a menudo a través de herramientas externas) para cumplir tareas.

### Componentes Principales

Todo Agente de IA se compone de dos partes esenciales:

**1. El Cerebro (Modelo de IA)**
- Maneja el razonamiento y la planificación
- Decide qué acciones tomar basándose en la situación
- Utiliza un Modelo de Lenguaje Grande (LLM) como su núcleo

**2. El Cuerpo (Capacidades y Herramientas)**
- Representa todo lo que el Agente está equipado para hacer
- Incluye herramientas externas como búsqueda web, cálculos, APIs
- Permite la interacción con el mundo real

## El Ciclo Pensamiento-Acción-Observación (TAO)

El funcionamiento de un Agente se rige por un ciclo continuo que se repite hasta alcanzar el objetivo:

**1. Pensamiento (Thought)**
- El LLM decide cuál debe ser el siguiente paso
- Realiza razonamiento interno basado en el contexto actual
- Planifica la estrategia a seguir

**2. Acción (Action)**
- El Agente ejecuta una acción, típicamente llamando a una herramienta
- Las herramientas pueden ser búsquedas web, cálculos, generación de imágenes, etc.
- El LLM genera una invocación de herramienta estructurada (JSON o código)

**3. Observación (Observation)**
- El Agente recibe el resultado de la acción como feedback
- Integra esta nueva información en su contexto (memoria)
- Usa este feedback para refinar sus próximas acciones

Este ciclo continúa hasta que se cumple el objetivo o se alcanza un estado terminal.

## Modelos de Lenguaje Grande (LLMs)

Los **LLMs** son el "cerebro" del Agente. Son modelos de IA que sobresalen en la comprensión y generación de lenguaje humano.

### Características Clave

- **Arquitectura:** Basados en la arquitectura Transformer
- **Principio:** Predicen el siguiente token en una secuencia
- **Entrenamiento:** Entrenados en vastas cantidades de datos de texto
- **Parámetros:** Típicamente tienen miles de millones de parámetros

### Tipos de Transformers

1. **Codificadores (Encoders):** Toman texto como entrada y producen una representación densa. Ejemplo: BERT
2. **Decodificadores (Decoders):** Se centran en generar nuevos tokens. Ejemplo: Llama, GPT
3. **Seq2Seq (Encoder-Decoder):** Combinan ambos para tareas como traducción. Ejemplo: T5, BART

## Herramientas (Tools)

Una **Herramienta** es una función que se proporciona al LLM para que pueda realizar acciones específicas. Las herramientas permiten al Agente ir más allá del texto y realizar acciones en el mundo real.

### Componentes de una Herramienta

- **Descripción textual:** Explica qué hace la función
- **Callable:** El código que ejecuta la acción
- **Argumentos:** Parámetros con tipado
- **Salidas:** Resultados con tipado (opcional)

### Ejemplos de Herramientas

- Búsqueda web (DuckDuckGo, Google)
- Generación de imágenes
- Cálculos matemáticos
- Acceso a bases de datos
- Llamadas a APIs externas
        `,
      },
      {
        id: "unit2",
        title: "ReAct y Razonamiento",
        content: `
## ReAct: Razonamiento + Actuación

**ReAct** (Reasoning + Acting) es una técnica de prompting que combina el razonamiento con la actuación. Es superior a **Chain-of-Thought (CoT)** cuando el agente necesita interactuar con herramientas externas.

### Chain-of-Thought vs ReAct

**Chain-of-Thought (CoT)**
- Guía al modelo a pensar paso a paso
- No utiliza herramientas externas
- Ideal para tareas de lógica y matemáticas internas
- El modelo solo razona sin actuar

**ReAct (Reasoning + Acting)**
- Intercala razonamiento con acciones (uso de herramientas)
- Permite búsqueda iterativa de información
- Ideal para tareas dinámicas de múltiples pasos
- El modelo razona, actúa, observa y continúa

### Ventajas de ReAct

1. **Información Actualizada:** El agente puede buscar información actual en tiempo real
2. **Corrección de Errores:** Si una acción falla, el agente puede ajustar su estrategia
3. **Tareas Complejas:** Permite resolver problemas que requieren múltiples pasos y herramientas
4. **Transparencia:** Es más fácil entender el razonamiento del agente

### Ejemplo de Flujo ReAct

\`\`\`
Pensamiento: "Necesito buscar información sobre el clima en París"
Acción: call weather_tool('Paris')
Observación: "El clima en París es 15°C, nublado"
Pensamiento: "Basándome en esta información, puedo recomendar..."
Acción: call recommendation_tool(weather_data)
Observación: "Recomendación generada"
Pensamiento: "He completado la tarea"
\`\`\`

## Tipos de Agentes por Formato de Acción

### Agente JSON

Las acciones se especifican en formato JSON estructurado. El LLM genera JSON que describe qué herramienta llamar y con qué parámetros.

### Agente de Código

El Agente escribe bloques de código (típicamente Python) que se interpretan y ejecutan externamente. Las observaciones son el resultado de ejecutar ese código.

### Agente de Llamada a Función (Function-Calling)

Una subcategoría del Agente JSON, optimizado para generar un nuevo mensaje para cada acción. Es el formato más moderno y eficiente.

## El Enfoque "Stop and Parse"

El método clave para ejecutar acciones es el **enfoque de detener y parsear**:

1. El LLM genera una acción estructurada (JSON o código)
2. El LLM se detiene (no continúa generando)
3. Un parser externo extrae la acción
4. El sistema ejecuta la herramienta
5. El resultado se devuelve al LLM como observación
6. El ciclo continúa

Este enfoque es crucial porque:
- Permite control preciso sobre qué herramientas se ejecutan
- Evita que el LLM genere código malicioso
- Asegura que las acciones sean determinísticas
        `,
      },
      {
        id: "unit3",
        title: "Frameworks Agénticos",
        content: `
## ¿Cuándo Usar un Framework Agéntico?

Un framework agéntico **no siempre es necesario** al construir una aplicación alrededor de LLMs. Sin embargo, se vuelve invaluable cuando el flujo de trabajo es complejo.

### Cuándo NO Necesitas un Framework

- El flujo de trabajo es simple (una cadena de prompts)
- Necesitas control total y comprensión del sistema
- El proyecto es pequeño y experimental

### Cuándo SÍ Necesitas un Framework

- El flujo de trabajo es complejo (múltiples pasos, múltiples herramientas)
- Necesitas gestión de memoria y contexto
- Requieres manejo de errores y reintentos automáticos
- Planeas usar múltiples agentes coordinados
- Necesitas llevar el sistema a producción

## Características Clave de un Framework

Un framework agéntico proporciona:

1. **Motor LLM:** Integración con diferentes modelos de lenguaje
2. **Gestión de Herramientas:** Registro y ejecución de herramientas
3. **Parser:** Extrae llamadas a herramientas de la salida del LLM
4. **Prompt del Sistema:** Sincronizado con el parser para instrucciones consistentes
5. **Sistema de Memoria:** Mantiene el contexto entre pasos
6. **Manejo de Errores:** Reintentos y recuperación de fallos

## Frameworks Principales

### smolagents (Hugging Face)

**Características:**
- Desarrollado por Hugging Face
- Se centra en CodeAgent (acciones mediante código Python)
- Integración nativa con el Hub de Hugging Face
- Fácil de usar para principiantes
- Soporte para Serverless API

**Mejor para:** Proyectos educativos y prototipos rápidos

### LlamaIndex

**Características:**
- Herramientas de extremo a extremo
- Especializado en agentes aumentados con contexto (RAG)
- Excelente para trabajar con documentos
- Listo para producción
- Buena documentación

**Mejor para:** Aplicaciones que necesitan integración con datos y documentos

### LangGraph

**Características:**
- Permite orquestación con estado de agentes
- Excelente para sistemas multi-agente
- Control fino sobre el flujo de ejecución
- Visualización de grafos de ejecución
- Ideal para flujos complejos

**Mejor para:** Sistemas complejos y multi-agente

## Comparación de Frameworks

| Aspecto | smolagents | LlamaIndex | LangGraph |
|--------|-----------|-----------|----------|
| Curva de Aprendizaje | Baja | Media | Media-Alta |
| Complejidad | Baja | Media | Alta |
| Multi-Agente | Básico | Limitado | Excelente |
| Documentación | Buena | Excelente | Buena |
| Producción-Ready | Sí | Sí | Sí |
        `,
      },
      {
        id: "unit4",
        title: "Evaluación y Futuro",
        content: `
## GAIA: Benchmark para Agentes Generales

**GAIA** (General AI Assistants) es un benchmark diseñado para evaluar asistentes de IA en tareas del mundo real que requieren una combinación de capacidades.

### Características de GAIA

**Propósito:** Evaluar el progreso hacia asistentes de IA verdaderamente de propósito general

**Desafío:** Las preguntas son conceptualmente simples para humanos, pero muy difíciles para los sistemas de IA actuales

**Principios Fundamentales:**
1. **Dificultad del Mundo Real:** Tareas requieren razonamiento, comprensión multimodal, navegación web
2. **Interpretabilidad Humana:** A pesar de su dificultad para IA, son fáciles de entender para humanos
3. **No-Gameabilidad:** No se pueden resolver por fuerza bruta, requieren ejecución completa
4. **Simplicidad de Evaluación:** Respuestas son concisas y unambiguas

### Resultados Actuales

- **Humanos:** ~92% de éxito
- **GPT-4 con Plugins:** ~15% de éxito
- **Deep Research (OpenAI):** 67.36% en validación

### Niveles de Dificultad

**Nivel 1: Básico**
- Menos de 5 pasos
- Uso mínimo de herramientas
- Razonamiento directo

**Nivel 2: Intermedio**
- Razonamiento más complejo
- 5-10 pasos
- Coordinación de múltiples herramientas

**Nivel 3: Avanzado**
- Planificación a largo plazo
- Integración avanzada de herramientas
- Razonamiento multi-hop complejo

## Protocolos Emergentes

### Model Context Protocol (MCP)

**Creador:** Anthropic

**Concepto:** Un estándar abierto que permite a los modelos de IA conectarse de forma segura y fluida con herramientas externas, datos y aplicaciones.

**Analogía:** Un "adaptador universal" (como USB-C) que permite al modelo "enchufarse" a varios entornos digitales sin necesidad de integración personalizada para cada uno.

**Impacto:** Está ganando tracción rápidamente en la industria, con empresas como OpenAI y Google comenzando a adoptarlo.

### Agent-to-Agent Protocol (A2A)

**Creador:** Google

**Concepto:** Un protocolo que conecta agentes entre sí, facilitando sistemas cooperativos de múltiples agentes que pueden trabajar juntos para resolver problemas complejos.

**Relación con MCP:** 
- MCP conecta agentes a herramientas externas
- A2A conecta agentes entre sí
- Juntos, forman la base de sistemas agénticos complejos

## El Futuro de los Agentes

### Tendencias Clave

1. **Estandarización:** MCP y A2A están definiendo cómo los agentes interactúan
2. **Interoperabilidad:** Los agentes podrán comunicarse entre sí sin fricción
3. **Complejidad:** Sistemas multi-agente coordinados resolverán problemas más complejos
4. **Especialización:** Agentes especializados en dominios específicos
5. **Confiabilidad:** Mejor evaluación y certificación de agentes

### Próximos Pasos para Aprender

- Profundizar en MCP y su implementación
- Explorar sistemas multi-agente
- Estudiar evaluación y benchmarking de agentes
- Implementar agentes en producción
- Contribuir a la comunidad de agentes de IA
        `,
      },
    ],
  },
};

export default function CourseView() {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // Extraer courseId y unitId de la URL
  const pathParts = location.split("/");
  const courseId = pathParts[2];
  const unitIdFromUrl = pathParts[4];

  const course = courseData[courseId];

  // Usar unitId de la URL si existe, sino usar el primero
  const currentUnitId = unitIdFromUrl || course?.units[0]?.id;
  const currentUnit = course?.units.find((u) => u.id === currentUnitId) || course?.units[0];
  const currentUnitIndex = course?.units.findIndex((u) => u.id === currentUnit?.id) || 0;

  if (!course) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Curso no encontrado</h1>
          <Button onClick={() => setLocation("/")} variant="outline">
            Volver a inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white text-center flex-1">
            {course.title}
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar - Units List */}
        <aside className="md:col-span-1">
          <div className="sticky top-20 space-y-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-4">
              Unidades
            </h2>
            {course.units.map((unit, index) => (
              <button
                key={unit.id}
                onClick={() => setLocation(`/course/${courseId}/unit/${unit.id}`)}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                  currentUnit?.id === unit.id
                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="text-sm font-bold w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm">{unit.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <article className="prose dark:prose-invert prose-sm max-w-none">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {currentUnit?.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Unidad {currentUnitIndex + 1} de {course.units.length}
            </p>

            {/* Content */}
            <div className="text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
              {currentUnit?.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("###")) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("|")) {
                  return (
                    <div key={idx} className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <tbody>
                          {paragraph.split("\n").map((row, ridx) => (
                            <tr key={ridx} className="border-b border-slate-200 dark:border-slate-700">
                              {row.split("|").map((cell, cidx) => (
                                <td
                                  key={cidx}
                                  className="px-4 py-2 text-slate-700 dark:text-slate-300"
                                >
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (paragraph.startsWith("```")) {
                  const code = paragraph.replace(/```/g, "").trim();
                  return (
                    <pre key={idx} className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-slate-800 dark:text-slate-200">{code}</code>
                    </pre>
                  );
                }
                if (paragraph.startsWith("-") || paragraph.startsWith("•")) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2">
                      {paragraph.split("\n").map((item, iidx) => (
                        <li key={iidx} className="text-slate-700 dark:text-slate-300">
                          {item.replace(/^[-•]\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-2">
                      {paragraph.split("\n").map((item, iidx) => (
                        <li key={iidx} className="text-slate-700 dark:text-slate-300">
                          {item.replace(/^\d+\.\s*/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="text-slate-700 dark:text-slate-300">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              {currentUnitIndex > 0 && (
                <Button
                  onClick={() =>
                    setLocation(
                      `/course/${courseId}/unit/${course.units[currentUnitIndex - 1].id}`
                    )
                  }
                  variant="outline"
                >
                  ← Anterior
                </Button>
              )}
              {currentUnitIndex < course.units.length - 1 && (
                <Button
                  onClick={() =>
                    setLocation(
                      `/course/${courseId}/unit/${course.units[currentUnitIndex + 1].id}`
                    )
                  }
                  className="ml-auto"
                >
                  Siguiente →
                </Button>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

