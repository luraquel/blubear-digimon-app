## Blubear Digimon App
Este es un proyecto de Angular Ionic en su última versión con Angular 17 y Ionic 7.5
# Pasos para ejecutar el proyecto
1. `npm i`
2. `ionic serve`
# Pasos para generar el APK (una vez se hayan descargado las dependencias)
Si se hace algun cambio, para generar una nueva apk se siguen estos pasos:
1. `ionic build --prod`
2. `npx cap copy`
3. `cd android`
4. `.\gradlew assembleDebug`
5. El apk se encontrará en `.\android\app\build\outputs\apk\debug`
