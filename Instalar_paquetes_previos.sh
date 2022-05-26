#!/bin/bash
echo "###########################################################"
echo "***  Comienza la instalación y preparación del proceso ***"
echo "############################################################"

echo "*** Ejecucion cypress ***"
DIRECTORIOACTUAL=$PWD

echo "Instalar paquetes de cypress"
cd $DIRECTORIOACTUAL/cypress
npm install

echo "Instalar paquetes de monkey - cypress"
cd $DIRECTORIOACTUAL/monkey-cypress
npm install

echo "Instalar paquetes de resemble"
cd $DIRECTORIOACTUAL/resemble
npm install

echo "Instalar el cliente de ghost"
npm install ghost-cli@latest -g
