### Ghost_4_41_3_Final Proceso final GRUPO 12

[Ver entrega final PDF y Video](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Entrega-final-Grupo-12)

[Resultados pruebas manuales](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Resultado-de-pruebas-manuales).

[Resultados pruebas E2E y aceptación](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Resultado-pruebas-E2E-y-aceptaci%C3%B3n).

[Ver Issues](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/issues)

[Pros y contras de cypress](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Pros-y-contras-de-Cypress).

[Pros y contras de monkey-cypress](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Pros-y-Contras-de-Monkey---Cypress).

[Pros y contras de resemble](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Pros-y-contras-Resemble).

[Retrospectiva](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Retrospectiva)

## Ejecutar procesos de pruebas

### Especificaciones de la máquina

| Característica      | Especificación                      |
| -------------------- | ----------------------------------- |
| Sistema Operativos   | Linux Ubuntu. Versión 20.04 LTS     |
| Memoria Ram          | 6GB                                 |
| Disco Duro           | 100GB SS                            |
| Git ubuntu 20.04 LTS |  https://git-scm.com/download/linux |
| Node.js              | 16.14.2 LTS https://nodejs.org/es/                        |

### Aplicación a Probar
| Característica     | Especificación                      |
| -------------------- | ----------------------------------- |
| Nombre              | Ghost |
| Version             | 4.41.3 |

### Aplicación a comparar regresión
| Característica     | Especificación                      |
| -------------------- | ----------------------------------- |
| Nombre              | Ghost |
| Version             | 4.30.0 |

### Instalar prerrequisitos (Recomendación del tutor).
Se debe ejecutar el comando **./Instalar_paquetes_previos.sh** para instalar las herramientas de ejecución de los siguientes scripts:

### Comandos de ejecucion de la Semana 1
| Técnica     | Comando                      | Resultados |
| -------------------- | ----------------------------------- |------|
| Proceso E2E y aceptación              | ./ejecutar_proceso_normal.sh | cd cypress/test/cypress/screenshots |
| Proceso reconocimiento monkey            | ./ejecutar_proceso_monkey.sh |cd monkey-cypress/cypress/videos/monkey |
| Proceso de regresión visual resemble | ./ejecutarRegresionVisualCypress.sh | cd reporteFinal_Cypress|
