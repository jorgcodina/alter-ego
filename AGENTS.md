# AGENTS.md - Instrucciones para Codex

## Proyecto

Estás trabajando en **Alter Ego**, una aplicación móvil que convierte acciones de la vida real en la evolución de un personaje virtual.

Alter Ego NO es una app de productividad.
Alter Ego NO es una lista de hábitos.
Alter Ego es una simulación personal tipo Los Sims / Stardew Valley / Habbo.

---

## Metodología

Este proyecto se desarrolla con **Specification Driven Development (SDD)**.

Para **CUALQUIER solicitud** debes:

1. Leer `AGENTS.md` (ya cargado).
2. Leer `.sdd/WORKFLOW.md`.
3. Leer `.sdd/RULES.md`.
4. Buscar la Task indicada.
5. Leer automáticamente las specs referenciadas por la Task.

## Flujo por defecto

Si el usuario pide **crear la siguiente tarea**:

1. Revisa `ROADMAP.md`.
2. Detecta la siguiente tarea pendiente.
3. Crea solo el archivo de task correspondiente en `tasks/`.
4. No implementes código.
5. Detente y espera aprobación del usuario.

Si el usuario pide **implementar T-XXX**:

1. Lee la task indicada.
2. Lee automáticamente todos los documentos y specs referenciados por la task.
3. Identifica inconsistencias, ambigüedades o información faltante.
4. Antes de escribir código, entrega:
   - Resumen de objetivo.
   - Documentos leídos.
   - Plan de implementación.
   - Alcance.
   - Fuera de alcance.
   - Riesgos o dudas.
5. Detente y espera aprobación explícita del usuario.
6. Solo puedes implementar cuando el usuario diga: **"aprobado, implementa"**.

Antes de implementar cualquier cosa, siempre debes leer:

1. `AGENTS.md`
2. `.sdd/WORKFLOW.md`
3. `.sdd/RULES.md`
4. Las specs de producto relevantes
5. Las specs funcionales relevantes
6. Las specs técnicas relevantes
7. La tarea actual en `tasks/`

---

## Regla principal

No implementes nada que no esté especificado.

Si falta información, existe ambigüedad o hay contradicciones entre documentos, detente y pregunta.

---

## Prioridad de fuentes

Cuando exista conflicto entre documentos, usa este orden de prioridad:

1. Specs de producto
2. Specs funcionales
3. Specs técnicas
4. Tarea
5. Código existente

Si el conflicto no se puede resolver, no decidas por tu cuenta. Pregunta.

---

## Reglas de producto

- El avatar es el protagonista.
- La identidad emerge del comportamiento.
- Los rasgos se ganan, se pueden perder y se pueden recuperar.
- El MVP no tiene IA.
- El MVP no tiene login.
- El MVP no tiene backend.
- El MVP no tiene sincronización cloud.
- El MVP usa registro manual de eventos.
- No agregues mecánicas fuera del scope.

---

## Reglas técnicas

Stack esperado:

- Expo
- React Native
- TypeScript
- Zustand
- SQLite local

Reglas:

- La lógica de dominio debe estar separada de la UI.
- La UI no debe contener reglas de juego.
- Las reglas de juego deben vivir en TypeScript puro.
- Mantén componentes pequeños.
- Mantén tipos estrictos.
- Evita duplicación.
- No agregues dependencias innecesarias.

---

## Antes de implementar

Debes responder con:

1. Resumen de la tarea.
2. Specs que leíste.
3. Plan de implementación.
4. Alcance.
5. Fuera de alcance.
6. Riesgos o dudas.

Luego debes detenerte y esperar aprobación explícita antes de modificar archivos.

---

## Antes de finalizar

Verifica:

- La implementación coincide con la tarea.
- No agregaste comportamiento no especificado.
- No agregaste features fuera del MVP.
- No dejaste TODOs sin explicación.
- El proyecto compila o explicas claramente qué falta.
