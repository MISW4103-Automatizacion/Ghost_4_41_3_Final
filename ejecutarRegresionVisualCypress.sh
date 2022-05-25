#!/bin/bash

echo "###########################################"
echo "*** Ejecucion regresion visual grupo 12 ***"
echo "###########################################"

echo "*** Ejecucion cypress ***"
DIRECTORIOACTUAL=$PWD
DIRECTORIOCYPRESS=$DIRECTORIOACTUAL/cypress/test

echo "*** Eliminar directorio imagenes ***"
rm -rf $DIRECTORIOCYPRESS/cypress/screenshots

echo "*** prepara la ejecucion de Ghost version 4.41.3 ***"
mv $DIRECTORIOCYPRESS/cypress1.json $DIRECTORIOCYPRESS/cypress.json

echo "*** se detiene Ghost version 4.41.3 ***"
if [ -d  "$DIRECTORIOACTUAL/ghost_4.41.3" ]; then
   echo "*** se detiene Ghost version 4.41.3 ***"
   cd $DIRECTORIOACTUAL/ghost_4.41.3
   ghost stop
   cd $DIRECTORIOACTUAL
fi

echo "*** se detiene Ghost version 4.30.0 ***"
if [ -d  "$DIRECTORIOACTUAL/ghost_4.30.0" ]; then
   echo "*** se detiene Ghost version 4.30.0 ***"
   cd $DIRECTORIOACTUAL/ghost_4.30.0
   ghost stop
   cd $DIRECTORIOACTUAL
fi

echo "*** se crea la carpeta para ghost actual version 4.41.3 ***"
rm -rf $DIRECTORIOACTUAL/ghost_4.41.3
mkdir $DIRECTORIOACTUAL/ghost_4.41.3

echo "*** Se instala la versión de ghost 4.41.3 ***"
cd $DIRECTORIOACTUAL/ghost_4.41.3
ghost install 4.41.3 --local

cd $DIRECTORIOACTUAL/cypress/test
echo "*** Se comienza con la ejecución de las pruebas de ls versión de ghost 4.41.3 ***"
cypress run --config video=false

echo "*** Elimina la carpeta para poner las imagenes de la ejecucion de ghost 4.41.3***"
rm -rf $DIRECTORIOACTUAL/imagenes1
mkdir $DIRECTORIOACTUAL/imagenes1
cp -r $DIRECTORIOCYPRESS/cypress/screenshots $DIRECTORIOACTUAL/imagenes1/screenshots

echo "*** finaliza la ejecucionde ghost versión de ghost 4.41.3 ***"
mv $DIRECTORIOCYPRESS/cypress.json $DIRECTORIOCYPRESS/cypress1.json

echo "*** se detiene Ghost version 4.41.3 ***"
if [ -d  "$DIRECTORIOACTUAL/ghost_4.41.3" ]; then
   echo "*** se detiene Ghost version 4.41.3 ***"
   cd $DIRECTORIOACTUAL/ghost_4.41.3
   ghost stop
   cd $DIRECTORIOACTUAL
fi

echo "*** se detiene Ghost version 4.30.0 ***"
if [ -d  "$DIRECTORIOACTUAL/ghost_4.30.0" ]; then
   echo "*** se detiene Ghost version 4.30.0 ***"
   cd $DIRECTORIOACTUAL/ghost_4.30.0
   ghost stop
   cd $DIRECTORIOACTUAL
fi

echo "*** se crea la carpeta para ghost actual version 4.30.0 ***"
rm -rf $DIRECTORIOACTUAL/ghost_4.30.0
mkdir $DIRECTORIOACTUAL/ghost_4.30.0

echo "*** Se instala la versión de ghost 4.30.0 ***"
cd $DIRECTORIOACTUAL/ghost_4.30.0
ghost install 4.30.0 --local

echo "*** prepara la ejecucion de Ghost version 4.30.0 ***"
mv $DIRECTORIOCYPRESS/cypress2.json $DIRECTORIOCYPRESS/cypress.json

cd $DIRECTORIOACTUAL/cypress/test
echo "*** Se comienza con la ejecución de las pruebas de ls versión de ghost 4.30.0 ***"
cypress run --config video=false

echo "*** Elimina la carpeta para poner las imagenes de la ejecucion de ghost 4.30.0***"
rm -rf $DIRECTORIOACTUAL/imagenes2
mkdir $DIRECTORIOACTUAL/imagenes2
cp -r $DIRECTORIOCYPRESS/cypress/screenshots $DIRECTORIOACTUAL/imagenes2/screenshots

echo "*** finaliza la ejecucionde ghost versión de ghost 4.30.0 ***"
mv $DIRECTORIOCYPRESS/cypress.json $DIRECTORIOCYPRESS/cypress2.json

echo "*** Instala las librerias de resemble ***"
cd $DIRECTORIOACTUAL
cd resemble
npm install

echo "*** Eliminar carpeta de las imagenes finales***"
rm -rf $DIRECTORIOACTUAL/reporteFinal_Cypress
mkdir $DIRECTORIOACTUAL/reporteFinal_Cypress

echo "*** Ejecuta el comparador de imagenes con resemble ***"
node copiarArchivos.js
node index.js

echo "*** El reporte de la regresion visual en cypress quedo en la ruta: ***"
echo $DIRECTORIOACTUAL/reporteFinal_Cypress

echo "*** Finaliza el reporte ***"

