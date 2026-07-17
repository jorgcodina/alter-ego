# TS-004 - Traits Engine

## Responsabilidad

Calcular progreso y desbloqueo de rasgos.

## Reglas

- Lector: 3 eventos de aprendizaje.
- Activo: 3 eventos físicos.
- Exfumador: 30 dias calendario sin eventos de fumar.
- Constante: 3 eventos de proyecto personal.
- Sociable: 3 eventos sociales.
- Lector, Activo, Constante y Sociable aparecen como bloqueados/en progreso desde el primer evento relevante.
- Lector, Activo, Constante y Sociable reinician progreso si pasan 7 dias calendario sin eventos relevantes.
- Si Lector, Activo, Constante o Sociable estaban desbloqueados y pasan 7 dias calendario sin eventos relevantes, el rasgo se pierde y su objeto asociado vuelve a bloquearse.
- Fumar reinicia progreso Exfumador.
- Los dias sin uso de la app cuentan como dias sin fumar para Exfumador.
- El estado de Exfumador debe exponer progreso actual, objetivo y dias restantes.
- El Trofeo Exfumador solo es visible si existe al menos un evento previo de fumar y paso al menos 1 dia calendario sin nuevos eventos de fumar.
- El Trofeo Exfumador no debe mostrarse a usuarios sin eventos previos de fumar.
