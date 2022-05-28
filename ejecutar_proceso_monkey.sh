#!/bin/bash
echo "###########################################################"
echo "***  Comienza la ejecución monkey del proceso ***"
echo "############################################################"

echo "*** Ejecucion cypress ***"
DIRECTORIOACTUAL=$PWD
DIRECTORIOCYPRESS=$DIRECTORIOACTUAL/monkey-cypress

echo "*** Eliminar directorio videos ***"
rm -rf $DIRECTORIOACTUAL/monkey-cypress/cypress/videos

if [ -d  "$DIRECTORIOACTUAL/ghost_4.41.3" ]; then
   echo "*** se detiene Ghost version 4.41.3 ***"
   cd $DIRECTORIOACTUAL/ghost_4.41.3
   ghost stop
   cd $DIRECTORIOACTUAL
fi

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

cd $DIRECTORIOACTUAL/monkey-cypress
echo "*** Se comienza con la ejecución de las pruebas monkey de la versión de ghost 4.41.3 ***"
cypress run

if [ -d  "$DIRECTORIOACTUAL/ghost_4.41.3" ]; then
   echo "*** se detiene Ghost version 4.41.3 ***"
   cd $DIRECTORIOACTUAL/ghost_4.41.3
   ghost stop
   cd $DIRECTORIOACTUAL
fi

if [ -d  "$DIRECTORIOACTUAL/ghost_4.30.0" ]; then
   echo "*** se detiene Ghost version 4.30.0 ***"
   cd $DIRECTORIOACTUAL/ghost_4.30.0
   ghost stop
   cd $DIRECTORIOACTUAL
fi

echo "*** Se eliminan las carpetas de Ghost ***"
rm -rf $DIRECTORIOACTUAL/ghost_4.41.3
rm -rf $DIRECTORIOACTUAL/ghost_4.30.0

echo "*** Elimina la carpeta para poner las evidencias de la ejecucion de ghost 4.41.3***"
rm -rf $DIRECTORIOACTUAL/resultadoMonkey
mkdir $DIRECTORIOACTUAL/resultadoMonkey
cp -r $DIRECTORIOACTUAL/monkey-cypress/results $DIRECTORIOACTUAL/resultadoMonkey
cp -r $DIRECTORIOACTUAL/monkey-cypress/cypress/videos/monkey $DIRECTORIOACTUAL/resultadoMonkey

echo "*** Finaliza el reporte ***"
