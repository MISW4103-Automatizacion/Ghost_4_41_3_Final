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

Realizar git clone https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final.git del repositorio e ingresar a la carpeta cd Ghost_4_41_3_Final

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

Importante antes de ejecutar estos comandos asegurese que su maquina no esta ejecutando ninguna version de ghots, estos script aseguran que la ejecucion se realice desde la url que genera por defecto esta herramienta http://localhost:2368/ghost/. en caso que por fuerza mayor necesite configurar otro puerto de la aplicación por favor debe realizarlos en los sigientes archivos:

cypress/test/cypress.json

cypress/test/cypress1.json

cypress/test/cypress2.json

monkey-cypress/cypress/integration/monkey/monkey.js

### Nota

Una vez comience el proceso debe dejar que termine ya que esto puede alterar el funcionamiento de otros scripts.

### Comandos de ejecucion de la Semana 1
| Técnica     | Comando                      | Resultados | Duración   |
| -------------------- | ----------------------------------- |------|----|
| Proceso E2E y aceptación              | ./ejecutar_proceso_normal.sh | cd imagenesProcesoNormal/screenshots |  |
| Proceso reconocimiento monkey            | ./ejecutar_proceso_monkey.sh |cd resultadoMonkey | 120 minutos |
| Proceso de regresión visual resemble | ./ejecutarRegresionVisualCypress.sh | cd reporteFinal_Cypress| 5 minutos |
