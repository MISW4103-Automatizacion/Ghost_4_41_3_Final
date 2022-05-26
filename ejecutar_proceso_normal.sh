#!/bin/bash
echo "###########################################################"
echo "***  Comienza la ejecución normal del proceso ***"
echo "############################################################"

echo "*** Ejecucion cypress ***"
DIRECTORIOACTUAL=$PWD
DIRECTORIOCYPRESS=$DIRECTORIOACTUAL/cypress/test

echo "*** Eliminar directorio imagenes ***"
rm -rf $DIRECTORIOCYPRESS/cypress/screenshots

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

cd $DIRECTORIOACTUAL/cypress/test
echo "*** Se comienza con la ejecución de las pruebas de ls versión de ghost 4.41.3 ***"
cypress run --config video=false

echo "*** Elimina la carpeta para poner las imagenes de la ejecucion de ghost 4.41.3***"
rm -rf $DIRECTORIOACTUAL/imagenesProcesoNormal
mkdir $DIRECTORIOACTUAL/imagenesProcesoNormal
cp -r $DIRECTORIOCYPRESS/cypress/screenshots $DIRECTORIOACTUAL/imagenesProcesoNormal/screenshots