# FS-004 - Rasgos

## Objetivo

Representar comportamiento sostenido.

## Reglas generales

Los rasgos aparecen como bloqueados/en progreso desde el primer evento relevante.
Los rasgos muestran progreso hacia su desbloqueo.
Los rasgos y objetos visibles se muestran como medallas dentro de la seccion principal del avatar.
Al seleccionar una medalla, el usuario puede ver el detalle de su progreso.
Lector, Activo, Constante y Sociable reinician progreso si pasan 7 dias calendario sin eventos relevantes.
Si un rasgo desbloqueado se queda 7 dias calendario sin eventos relevantes, el rasgo se pierde y puede recuperarse volviendo a completar su progreso.
Los objetos asociados se bloquean o desbloquean junto con el rasgo correspondiente.
Exfumador usa reglas especiales de calendario sin fumar.

## Rasgos MVP

## Lector

Se desbloquea con 3 eventos de aprendizaje.
Se muestra desde el primer evento de aprendizaje.
Reinicia progreso si pasan 7 dias calendario sin eventos de aprendizaje.
Desbloquea Biblioteca.

## Activo

Se desbloquea con 3 eventos físicos.
Cuentan: Caminé, Hice ejercicio intenso.
Se muestra desde el primer evento fisico.
Reinicia progreso si pasan 7 dias calendario sin eventos fisicos.
Desbloquea Bicicleta.

## Exfumador

Se desbloquea con 30 dias calendario sin registrar eventos de fumar.
Los dias sin uso de la app tambien cuentan como dias sin fumar.
Registrar Fume un cigarro reinicia progreso.
Desbloquea Trofeo Exfumador.
El Trofeo Exfumador no se muestra a usuarios que nunca registraron Fume un cigarro.
El Trofeo Exfumador se muestra bloqueado/en progreso cuando ya existe al menos un registro de Fume un cigarro y paso al menos 1 dia calendario sin volver a fumar.
El Trofeo Exfumador muestra una barra de progreso hacia el 100%.
Al seleccionar el trofeo, el usuario puede ver el detalle de progreso y cuantos dias faltan para completarlo.

## Constante

Se desbloquea con 3 eventos de proyecto personal.
Se muestra desde el primer evento de proyecto personal.
Reinicia progreso si pasan 7 dias calendario sin eventos de proyecto personal.
Desbloquea Mesa de Proyectos.

## Sociable

Se desbloquea con 3 eventos sociales.
Se muestra desde el primer evento social.
Reinicia progreso si pasan 7 dias calendario sin eventos sociales.
Desbloquea Mesa Social.
