# T-002 - Domain Engine

## Objetivo

Implementar el motor de dominio base de Alter Ego para representar el estado inicial del personaje, registrar acciones como eventos y aplicar efectos sobre sus necesidades.

## Lectura requerida

- AGENTS.md
- .sdd/WORKFLOW.md
- .sdd/RULES.md
- specs/00-producto/Vision.md
- specs/00-producto/GameLoop.md
- specs/02-tecnico/TS-001-Arquitectura.md
- specs/02-tecnico/TS-002-Dominio.md
- specs/02-tecnico/TS-003-Events-Engine.md
- tasks/T-002-domain-engine.md

## Alcance

- Definir tipos base de necesidades.
- Definir el tipo base de personaje.
- Definir tipos base de acciones.
- Definir tipos base de eventos.
- Definir tipos base de logs de eventos.
- Implementar el motor para aplicar efectos de eventos sobre necesidades.
- Implementar una funcion para resolver el estado del personaje a partir de un estado inicial y logs de eventos.
- Crear configuracion inicial de acciones.
- Crear configuracion inicial de eventos.
- Mantener toda la logica de dominio en TypeScript puro, independiente de React Native.
- Aplicar efectos usando clamp entre 0 y 100.
- Registrar en el EventLog los efectos aplicados.

## Fuera de alcance

- UI.
- Navegacion.
- Persistencia SQLite.
- Rasgos.
- Identidades.
- Diario funcional.
- Feedback modal.
- Diseno final.
- Zustand/state de aplicacion.
- Integracion con pantallas.
- Backend.
- Login.
- Cloud sync.
- IA.

## Pasos sugeridos

1. Revisar las specs requeridas y confirmar que no existan inconsistencias de alcance.
2. Crear los tipos de dominio base en la capa `src/domain`.
3. Definir las necesidades del personaje como valores numericos entre 0 y 100.
4. Crear la configuracion inicial de acciones disponibles.
5. Crear la configuracion inicial de eventos y sus efectos.
6. Implementar una funcion pura para aplicar un evento sobre las necesidades del personaje.
7. Implementar una funcion pura para resolver el estado del personaje usando un estado inicial y una lista de logs.
8. Asegurar que los efectos aplicados queden representados en el `EventLog`.
9. Agregar pruebas o verificaciones minimas del dominio si el proyecto ya cuenta con infraestructura para ello.
10. Ejecutar typecheck y confirmar que no se agrego comportamiento fuera del alcance.

## Definition of Done

- Existen tipos base para necesidades, personaje, acciones, eventos y logs de eventos.
- Existe configuracion inicial de acciones.
- Existe configuracion inicial de eventos.
- Existe un motor de dominio en TypeScript puro que aplica efectos sobre necesidades.
- Los efectos se aplican con clamp entre 0 y 100.
- Los logs de eventos guardan los efectos aplicados.
- Existe una funcion para resolver el estado del personaje a partir de estado inicial y logs.
- No hay dependencia de React Native dentro de la logica de dominio.
- No se implementan UI, navegacion, persistencia, rasgos, identidades, diario funcional ni feedback modal.
- El proyecto compila o se explica claramente que falta.
