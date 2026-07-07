# Alter Ego SDD

Esta carpeta configura Alter Ego para trabajar con Specification Driven Development usando Codex u otro agente.

## Estructura

```txt
AGENTS.md
.sdd/
specs/
tasks/
```

## Cómo pedirle a Codex que implemente

Ejemplo para la primera tarea:

```txt
Lee AGENTS.md primero.

Implementa solo la tarea T-001.

Lectura requerida:
- .sdd/WORKFLOW.md
- .sdd/RULES.md
- specs/00-producto/Vision.md
- specs/00-producto/GameLoop.md
- specs/02-tecnico/TS-001-Arquitectura.md
- tasks/T-001-bootstrap-app.md

Antes de escribir código:
1. Resume el objetivo.
2. Lista los documentos leídos.
3. Explica el plan de implementación.
4. Confirma alcance y fuera de alcance.

Luego implementa únicamente lo solicitado por T-001.
No implementes motor de juego, rasgos, identidades, persistencia ni UI final.
```
