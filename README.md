Expense Notes

Playstore: https://play.google.com/store/apps/details?id=com.expensenotes

Steps to install:
npm install
react-native eject
react-native link

Clean:
rm -rf android ios node_modules

Run on Android:
react-native run-android

Run release version on Android:
$ react-native run-android --variant=release

Steps to do before creating production apk:
Read https://facebook.github.io/react-native/docs/signed-apk-android.html
Read

Create release APK
The generated APK can be found under android/app/build/outputs/apk/app-release.apk, and is ready to be distributed.

$ cd android && ./gradlew assembleRelease


Add Admob
npm install react-native-admob@2.0.0-beta.3
react-native link
