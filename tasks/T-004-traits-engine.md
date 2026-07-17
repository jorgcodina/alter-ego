# T-004 - Traits Engine

## Estado

implemented

## Objetivo

Implementar el motor de rasgos de Alter Ego para calcular progreso, desbloquear rasgos MVP y registrar los objetos desbloqueados correspondientes a partir de los eventos registrados por el usuario.

## Documentos requeridos

- AGENTS.md
- .sdd/WORKFLOW.md
- .sdd/RULES.md
- ROADMAP.md
- specs/00-producto/Vision.md
- specs/00-producto/GameLoop.md
- specs/01-funcional/FS-002-Registrar-Evento.md
- specs/01-funcional/FS-004-Rasgos.md
- specs/02-tecnico/TS-001-Arquitectura.md
- specs/02-tecnico/TS-002-Dominio.md
- specs/02-tecnico/TS-003-Events-Engine.md
- specs/02-tecnico/TS-004-Traits-Engine.md
- specs/02-tecnico/TS-005-State.md
- tasks/T-004-traits-engine.md

## Alcance

- Definir tipos base de rasgos en la capa de dominio:
  - TraitDefinition.
  - TraitState.
  - RoomObject.
- Crear la configuracion MVP de rasgos:
  - Lector.
  - Activo.
  - Exfumador.
  - Constante.
  - Sociable.
- Crear la configuracion MVP de objetos desbloqueados:
  - Biblioteca.
  - Bicicleta.
  - Trofeo Exfumador.
  - Mesa de Proyectos.
  - Mesa Social.
- Implementar un motor puro de TypeScript para calcular progreso de rasgos desde EventLogs.
- Implementar desbloqueo de rasgos cuando se cumplan sus condiciones MVP.
- Implementar desbloqueo del objeto asociado cuando se desbloquee un rasgo.
- Implementar regla general de aparicion/progreso para Lector, Activo, Constante y Sociable:
  - Se muestran bloqueados/en progreso desde el primer evento relevante.
  - Muestran progreso hacia su objetivo.
  - Reinician progreso si pasan 7 dias calendario sin eventos relevantes.
  - Si estaban desbloqueados y pasan 7 dias calendario sin eventos relevantes, el rasgo se pierde.
  - El objeto asociado vuelve a bloquearse si el rasgo se pierde.
- Implementar la regla de Exfumador:
  - Se desbloquea con 30 dias calendario sin registrar eventos de fumar.
  - Los dias sin uso de la app tambien cuentan como dias sin fumar.
  - Registrar "Fume un cigarro" reinicia su progreso.
  - El progreso expone dias actuales, objetivo y dias restantes.
  - El Trofeo Exfumador no se muestra a usuarios que nunca registraron "Fume un cigarro".
  - El Trofeo Exfumador se muestra bloqueado/en progreso cuando ya existe al menos un registro de "Fume un cigarro" y paso al menos 1 dia calendario sin volver a fumar.
  - El Trofeo Exfumador muestra una barra de progreso y permite ver detalle al seleccionarlo.
- Actualizar la capa state con Zustand para sostener:
  - TraitStates.
  - RoomObjects.
- Implementar o conectar `recalculateTraits()` en state.
- Ejecutar `recalculateTraits()` despues de registrar una accion.
- Mantener toda la logica de rasgos fuera de la UI.
- Mostrar en la UI existente informacion minima de rasgos y objetos desbloqueados solo si es necesario para verificar la funcionalidad.
- Mostrar rasgos y objetos visibles como medallas dentro de la seccion principal del avatar.
- Permitir seleccionar una medalla para ver el detalle de progreso.
- Mostrar el Trofeo Exfumador como insignia o medalla con barra de progreso.
- Permitir seleccionar el Trofeo Exfumador para ver el detalle de progreso y dias restantes.

## Fuera de alcance

- Identity engine.
- Recalculo de identidades.
- Diario funcional.
- Persistencia SQLite.
- Daily decay.
- Diseno final de rasgos.
- Animaciones o feedback modal final.
- Objetos interactivos en una habitacion.
- Tracking automatico por sensores o fuentes externas.
- Economia.
- Backend.
- Login.
- Cloud sync.
- IA.
- Notificaciones.
- Mascotas.
- Multiplayer.

## Plan esperado

1. Leer todos los documentos requeridos.
2. Revisar el dominio y state existentes de T-002 y T-003.
3. Confirmar que los EventLogs actuales contienen informacion suficiente para clasificar eventos por categoria de rasgo y fecha calendario.
4. Si falta informacion en acciones/eventos, ampliar solo la configuracion necesaria para soportar las reglas MVP de rasgos.
5. Definir tipos de rasgos, progreso y objetos en `src/domain`.
6. Crear configuracion declarativa de rasgos y objetos MVP.
7. Implementar una funcion pura para recalcular TraitStates desde EventLogs.
8. Implementar una funcion pura para detectar si pasaron 7 dias calendario sin eventos relevantes para Lector, Activo, Constante y Sociable.
9. Implementar una funcion pura para calcular progreso de Exfumador desde el ultimo evento de fumar hasta la fecha actual.
10. Implementar una funcion pura para derivar RoomObjects desbloqueados desde TraitStates.
11. Integrar `TraitStates`, `RoomObjects` y `recalculateTraits()` en Zustand.
12. Asegurar que `registerAction(actionId)` recalcula rasgos despues de guardar el EventLog.
13. Mantener IdentityStates y `recalculateIdentities()` fuera de alcance o como placeholder no funcional solo si el tipo existente lo requiere.
14. Agregar pruebas o verificaciones minimas del dominio si el proyecto cuenta con infraestructura para ello.
15. Ejecutar typecheck.
16. Entregar casos de revision al usuario y esperar aprobacion antes de push.

## Criterios de aceptacion

- Existen tipos base para TraitDefinition, TraitState y RoomObject.
- Existe configuracion MVP para los cinco rasgos definidos en FS-004.
- Existe configuracion MVP para los cinco objetos desbloqueables definidos en FS-004.
- El motor de rasgos vive en TypeScript puro y no depende de React Native.
- Lector se desbloquea con 3 eventos de aprendizaje.
- Lector se muestra desde el primer evento de aprendizaje.
- Lector reinicia progreso y se pierde si pasan 7 dias calendario sin eventos de aprendizaje.
- Activo se desbloquea con 3 eventos fisicos.
- Activo se muestra desde el primer evento fisico.
- Activo reinicia progreso y se pierde si pasan 7 dias calendario sin eventos fisicos.
- Exfumador se desbloquea con 30 dias calendario sin eventos de fumar.
- Los dias sin uso de la app cuentan como dias sin fumar para Exfumador.
- Registrar "Fume un cigarro" reinicia progreso de Exfumador.
- El progreso de Exfumador expone dias actuales, objetivo y dias restantes.
- El Trofeo Exfumador no se muestra a usuarios sin eventos previos de fumar.
- El Trofeo Exfumador se muestra bloqueado/en progreso desde 1 dia calendario sin fumar despues de un evento previo de fumar.
- El Trofeo Exfumador se muestra como insignia o medalla con barra de progreso.
- Al seleccionar el Trofeo Exfumador, el usuario puede ver detalle de progreso y dias restantes.
- Rasgos y objetos visibles se muestran como medallas dentro de la seccion principal del avatar.
- Al seleccionar una medalla, el usuario puede ver el detalle de progreso.
- Constante se desbloquea con 3 eventos de proyecto personal.
- Constante se muestra desde el primer evento de proyecto personal.
- Constante reinicia progreso y se pierde si pasan 7 dias calendario sin eventos de proyecto personal.
- Sociable se desbloquea con 3 eventos sociales.
- Sociable se muestra desde el primer evento social.
- Sociable reinicia progreso y se pierde si pasan 7 dias calendario sin eventos sociales.
- Cada rasgo desbloqueado desbloquea su objeto asociado.
- Cada rasgo perdido vuelve a bloquear su objeto asociado.
- State contiene TraitStates y RoomObjects.
- `registerAction(actionId)` recalcula rasgos despues de registrar el evento.
- La UI no contiene reglas de juego de rasgos.
- No se implementan identidades funcionales.
- No se implementa persistencia SQLite.
- El proyecto compila o se explica claramente que falta.

## Checklist de aprobacion

- [x] La task tiene objetivo claro.
- [x] La task referencia specs de producto, funcionales y tecnicas necesarias.
- [x] El alcance esta definido.
- [x] El fuera de alcance esta definido.
- [x] No hay contradicciones sin resolver.
- [x] La task fue aprobada antes de implementar.

## Riesgos o dudas

- TS-005 incluye IdentityStates y `recalculateIdentities()`, pero T-005 del roadmap reserva el motor de identidades para la siguiente tarea. Propuesta: en T-004 no implementar identidades funcionales.
- GameLoop y FS-002 mencionan que el evento aparece en Diario, pero T-006 reserva Diario para una tarea posterior. Propuesta: en T-004 no implementar diario funcional.
- Exfumador depende del paso de dias calendario incluso si el usuario no abre la app. La implementacion debe calcularlo desde EventLogs y fecha actual, no crear eventos automaticos.
- Lector, Activo, Constante y Sociable tambien dependen del paso de dias calendario para reiniciar/perderse. La implementacion debe calcular vigencia desde EventLogs y fecha actual.

## Definition of Done

- Existe un motor de rasgos puro en `src/domain`.
- El motor calcula progreso y desbloqueo de los cinco rasgos MVP desde EventLogs y fecha actual cuando corresponda.
- Los objetos asociados se desbloquean al desbloquear sus rasgos.
- Los objetos asociados se vuelven a bloquear si se pierde el rasgo correspondiente.
- El Trofeo Exfumador muestra progreso hacia 30 dias y detalle al seleccionarlo.
- Rasgos y objetos se muestran como medallas dentro del panel principal del avatar.
- Zustand sostiene TraitStates y RoomObjects.
- Registrar una accion recalcula rasgos sin mover reglas de juego a la UI.
- No hay identidad funcional, diario funcional ni persistencia.
- No se agregan dependencias innecesarias.
- El proyecto compila o se documenta claramente que falta.
