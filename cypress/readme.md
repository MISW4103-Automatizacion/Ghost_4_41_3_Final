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

### Pasos Instalacion Ghots ubuntu 20.04 LTS
| Característica      | Comandos                      |
| -------------------- | ----------------------------------- |
| Instalar cliente ghost                   | sudo npm install ghost-cli@latest -g |
| Crear un directorio vacio                | mkdir ghost\_4.41.3 |
| Ingresar a la carpeta                    | cd ghost\_4.41.3 |
| Instalar ghost 4.41.3                    | ghost install 4.41.3 --local |
| Validar si ghost esta ejecutando.        | [http://localhost:2368/ghost/](http://localhost:2368/ghost/) |

### Pasos Instalacion Cypress ubuntu 20.04 LTS
| Caracteristica.      | Especificación                      |
| -------------------- | ----------------------------------- |
| Descargar el proyecto actual de pruebas    | git clone https://github.com/MISW4103-Automatizacion/E2EGhost\_4.41.3.git |
| Ingresar a la carpeta                      | cd cypress |
| Instalar dependencias                      | npm install |
| Prerrequisitos para cypress cliente        | apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb |
| Instalacion cypress                        | npm install cypress --save-dev |

### Comandos para ejecutar las pruebas por consola
1. cd test/cypress
2. cypress run --headless

### Ejecutar las pruebas con la aplicación de cypress
1. Cypress open
2. Cuando abra la aplicación debe buscar la carpeta donde se decargo el proyecto de las pruebas https://github.com/MISW4103-Automatizacion/E2EGhost\_4.41.3.git y buscar cypress/tests y hay apareceran todos los test a ejecutar.

| Consideraciones tener en cuenta                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validar que la direccion web de la aplicaion de ghost sea http://localhost:2368/ghost/                                                                                                                      |
| En caso de no ser asi debe modificar el archivo cypress/test/cypress.json y cambiar las varibales "baseUrl": "http://localhost:2368/ghost/" y "URLMAIN": "http://localhost:2368/" a la ruta correspondiente |
|  Debe serguir el paso a paso de este readme para garantizar la efectiva ejecucion de las pruebas.                                                                                                                            |
| Las pruebas estan construidas para que se ejecuten en cualquier orden que lo disponga ya que no tiene dependecia las unas con las otras.                                                                    |
| Para la primera ejecución el sistema valida si el usuario existe en caso contrario lo creara.                                                                                                               |
