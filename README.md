# Teoría de Agentes de IA

Una página web educativa que sintetiza y presenta los conceptos fundamentales sobre **Agentes de Inteligencia Artificial**, basada en el curso de Hugging Face Learn.

## 🎯 Objetivo

Proporcionar una guía clara, estructurada y visualmente atractiva para aprender sobre:
- **Fundamentos de Agentes de IA:** Definición, componentes y el ciclo Pensamiento-Acción-Observación
- **Modelos de Lenguaje (LLMs):** Rol como el "cerebro" del Agente
- **Herramientas y ReAct:** Interacción con el entorno
- **Frameworks Agénticos:** smolagents, LlamaIndex, LangGraph
- **Evaluación:** Benchmark GAIA
- **Futuro:** Protocolos MCP y A2A

## 📚 Contenido

El sitio está organizado en tres secciones principales:

### 1. Fundamentos
Conceptos básicos sobre qué son los agentes, cómo funcionan y sus componentes principales.

### 2. Frameworks
Descripción de los principales frameworks para construir agentes de IA y cuándo usarlos.

### 3. Evaluación
Información sobre el benchmark GAIA y los protocolos emergentes (MCP, A2A) que moldearán el futuro de los agentes.

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- pnpm (gestor de paquetes)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/agentes_ia_web.git
cd agentes_ia_web

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
agentes_ia_web/
├── client/
│   ├── public/          # Archivos estáticos
│   ├── src/
│   │   ├── pages/       # Componentes de página
│   │   ├── components/  # Componentes reutilizables
│   │   ├── App.tsx      # Enrutador principal
│   │   ├── main.tsx     # Punto de entrada
│   │   └── index.css    # Estilos globales
│   └── index.html       # Plantilla HTML
├── README.md            # Este archivo
└── package.json         # Dependencias del proyecto
```

## 🎨 Diseño

El sitio utiliza:
- **React 19** para la interfaz de usuario
- **Tailwind CSS 4** para estilos
- **shadcn/ui** para componentes de UI consistentes
- **Lucide Icons** para iconografía
- **Wouter** para enrutamiento del lado del cliente

### Tema
El sitio utiliza un tema claro por defecto con soporte para tema oscuro. Los colores principales son:
- **Indigo/Blue:** Colores primarios para acciones y énfasis
- **Slate:** Colores neutros para texto y fondos
- **Gradientes:** Fondos visuales atractivos

## 🔧 Desarrollo

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de producción
pnpm preview

# Linting
pnpm lint
```

## 📝 Fuentes

El contenido está basado en:
- [Hugging Face Learn - Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction)
- Documentación oficial de frameworks (smolagents, LlamaIndex, LangGraph)
- Publicaciones sobre GAIA, MCP y A2A

## 🌐 Despliegue en GitHub Pages

Para desplegar este sitio en GitHub Pages:

1. **Crear un repositorio en GitHub** con el nombre `tu-usuario.github.io` o `agentes_ia_web`

2. **Configurar el repositorio:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/agentes_ia_web.git
   git push -u origin main
   ```

3. **Habilitar GitHub Pages:**
   - Ve a Settings → Pages
   - Selecciona "Deploy from a branch"
   - Elige `main` como rama
   - Selecciona `/root` como carpeta
   - Guarda los cambios

4. **Construir y desplegar:**
   ```bash
   pnpm build
   git add dist/
   git commit -m "Build for production"
   git push
   ```

El sitio estará disponible en `https://tu-usuario.github.io/agentes_ia_web` o `https://tu-usuario.github.io` (si usas el repositorio especial).

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usar, modificar y distribuir el contenido.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras errores o tienes sugerencias para mejorar el contenido, por favor abre un issue o pull request.

## 📧 Contacto

Para preguntas o sugerencias, puedes contactar a través de:
- Issues en GitHub
- Correo electrónico (si se proporciona)

---

**Nota:** Este sitio es un proyecto educativo diseñado para sintetizar y compartir conocimiento sobre Agentes de IA. El contenido se actualiza regularmente con los últimos desarrollos en el campo.

