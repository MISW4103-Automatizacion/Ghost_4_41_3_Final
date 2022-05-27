### Ghost_4_41_3_Final Proceso final GRUPO 12

[Ver pruebas manuales](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Pruebas-Manuales).

[Pros y contras de cypress](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Pros-y-contras-de-Cypress).

[Pros y contras de monkey-cypress](https://github.com/MISW4103-Automatizacion/Ghost_4_41_3_Final/wiki/Pros-y-Contras-de-Monkey---Cypress).

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

### Aplicación a comparar regresión visual Semana 8
| Característica     | Especificación                      |
| -------------------- | ----------------------------------- |
| Nombre              | Ghost |
| Version             | 4.30.0 |

Se debe ejecutar el comando ./Instalar_paquetes_previos.sh para instalar las herramientas de ejecución de los scripts posteriores.

### Comandos de ejecucion de la Semana 1
| Técnica     | Comando                      | Resultados |
| -------------------- | ----------------------------------- |------|
| Proceso normal              | ./ejecutar_proceso_normal.sh | cd cypress/test/cypress/screenshots |
| Proceso normal              | ./ejecutar_proceso_normal.sh | cd cypress/test/cypress/screenshots |
| Proceso reconocimiento             | ./ejecutar_proceso_monkey.sh |cd monkey-cypress/cypress/videos/monkey |
| Proceso de regresión visual | ./ejecutarRegresionVisualCypress.sh | cd reporteFinal_Cypress|
