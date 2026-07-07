# Workflow SDD

## Flujo

Idea
→ Spec de Producto
→ Spec Funcional
→ Spec Técnica
→ Task
→ Implementación
→ Review

## Approval Gates

### Gate 1: aprobación de task antes de implementación

Cada task debe ser creada como propuesta antes de implementar. Después de crear o actualizar una task, detente y espera aprobación del usuario.

### Gate 2: aprobación del plan antes de modificar código

Antes de modificar archivos de implementación, lee la task y sus specs referenciadas, identifica inconsistencias y entrega un plan de implementación. No modifiques código hasta recibir aprobación explícita.

### Gate 3: review posterior a implementación

Después de implementar, entrega qué debe revisar el usuario y todos los casos a revisar. Espera aprobación antes de hacer push o avanzar a la siguiente tarea.

No implementes ninguna feature sin:
- Spec funcional
- Spec técnica
- Task

Si falta información o hay contradicciones, detente y pregunta.
