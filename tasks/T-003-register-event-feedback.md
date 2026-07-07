# T-003 - Register Event and Feedback

## Estado

implemented

## Objetivo

Permitir que el usuario registre una accion real desde la Home, aplicar el evento asociado sobre el estado local del personaje y mostrar feedback inmediato con los cambios de necesidades producidos por esa accion.

## Documentos requeridos

- AGENTS.md
- .sdd/WORKFLOW.md
- .sdd/RULES.md
- ROADMAP.md
- specs/00-producto/Vision.md
- specs/00-producto/GameLoop.md
- specs/01-funcional/FS-002-Registrar-Evento.md
- specs/01-funcional/FS-003-Feedback.md
- specs/02-tecnico/TS-001-Arquitectura.md
- specs/02-tecnico/TS-002-Dominio.md
- specs/02-tecnico/TS-003-Events-Engine.md
- specs/02-tecnico/TS-005-State.md
- specs/03-ui/Design-System.md
- tasks/T-003-register-event-feedback.md

## Alcance

- Crear o actualizar la capa `state` con Zustand para sostener:
  - Character.
  - EventLogs.
- Implementar la accion minima `registerAction(actionId)` en state.
- Usar el motor de dominio existente para:
  - Resolver la accion seleccionada.
  - Aplicar el evento asociado.
  - Actualizar necesidades del personaje.
  - Guardar el EventLog generado.
- Usar una sola vista Home como referencia funcional del MVP.
- Actualizar la Home para mostrar las acciones MVP definidas en `FS-002`.
- Mostrar las seis necesidades definidas por `FS-001` como barras:
  - Salud.
  - Energía.
  - Ánimo.
  - Social.
  - Intelecto.
  - Propósito.
- Permitir seleccionar una accion MVP manualmente.
- Mostrar feedback inmediato despues de registrar una accion.
- El feedback debe mostrar, como minimo:
  - Accion registrada.
  - Cambios positivos de necesidades.
  - Cambios negativos de necesidades.
  - Estado actualizado del personaje.
- Mantener la logica de reglas de juego fuera de la UI.
- Usar UI placeholder simple y consistente con el MVP.
- Usar emojis solo como placeholders visuales si hacen falta.

## Fuera de alcance

- Persistencia SQLite.
- Diario funcional.
- Rasgos funcionales.
- Identidades funcionales.
- Objetos desbloqueables funcionales.
- Progreso real hacia rasgos.
- Rasgos desbloqueados.
- Objetos desbloqueados.
- Rasgos perdidos.
- Feedback modal final o diseno final.
- Daily decay.
- Backend.
- Login.
- Cloud sync.
- IA.
- Notificaciones.
- Economia.
- Mascotas.
- Multiplayer.

## Plan esperado

1. Leer todos los documentos requeridos.
2. Detectar inconsistencias entre `FS-003` y el roadmap respecto a rasgos, identidades y objetos.
3. Proponer resolucion de alcance antes de implementar.
4. Revisar el dominio existente de T-002 y confirmar que permite registrar acciones MVP.
5. Si faltan acciones/eventos MVP en la configuracion de dominio, ampliar solo esa configuracion sin agregar mecanicas fuera de spec.
6. Crear un store Zustand en `src/state` con `Character`, `EventLogs` y `registerAction(actionId)`.
7. Conectar la Home al store.
8. Renderizar las barras de necesidades.
9. Renderizar la lista de acciones MVP en Home.
10. Al seleccionar una accion, registrar el evento y mostrar feedback inmediato.
11. Mantener feedback de rasgos/objetos fuera de alcance o como seccion no funcional si se aprueba explicitamente.
12. Ejecutar typecheck.
13. Entregar casos de revision al usuario y esperar aprobacion antes de push.

## Criterios de aceptación

- La Home muestra las acciones MVP de `FS-002`.
- La Home muestra barras para Salud, Energía, Ánimo, Social, Intelecto y Propósito.
- El usuario puede seleccionar una accion.
- Al seleccionar una accion se ejecuta `registerAction(actionId)`.
- La accion seleccionada aplica el evento asociado sobre las necesidades del personaje.
- Las necesidades se mantienen entre 0 y 100.
- Se genera y guarda un EventLog por cada accion registrada.
- El feedback inmediato muestra la accion registrada.
- El feedback inmediato separa cambios positivos y negativos.
- El feedback inmediato muestra el estado actualizado del personaje.
- La UI no contiene reglas de juego.
- La logica de dominio sigue independiente de React Native.
- No se implementa persistencia SQLite.
- No se implementan rasgos, identidades ni objetos funcionales.

## Checklist de aprobación

- [ ] La task tiene objetivo claro.
- [ ] La task referencia specs de producto, funcionales y técnicas necesarias.
- [ ] El alcance está definido.
- [ ] El fuera de alcance está definido.
- [ ] No hay contradicciones sin resolver.
- [x] La task fue aprobada antes de implementar.

## Riesgos o dudas

- `FS-003` pide mostrar progreso hacia rasgos, rasgos desbloqueados, objetos desbloqueados y rasgos perdidos, pero `ROADMAP.md` deja traits e identity para T-004 y T-005. Propuesta: en T-003 mostrar solo feedback de necesidades y dejar rasgos/objetos fuera de alcance hasta sus tareas correspondientes.
- `FS-002` define acciones MVP concretas, pero T-002 dejo una configuracion inicial minima de acciones genericas. T-003 probablemente debera reemplazar o ampliar esa configuracion para cubrir las acciones MVP.
- `TS-005` menciona `recalculateTraits()` y `recalculateIdentities()`, pero ambas quedan fuera de alcance en T-003 por roadmap.

## Definition of Done

- Existe una implementacion de state con Zustand para `Character` y `EventLogs`.
- Existe `registerAction(actionId)` conectado al motor de dominio.
- La Home permite registrar acciones MVP manualmente.
- Registrar una accion actualiza necesidades y guarda un EventLog.
- Se muestra feedback inmediato con accion registrada, cambios positivos, cambios negativos y estado actualizado.
- No hay persistencia SQLite.
- No hay rasgos, identidades ni objetos funcionales.
- No hay reglas de juego dentro de la UI.
- El proyecto compila o se explica claramente que falta.
