# Expense Notes

Playstore: https://play.google.com/store/apps/details?id=com.expensenotes


### Development

* Setup nodejs

* Steps to install:
  ```
  npm install
  npx react-native eject
  npx react-native link
  ```

<!--
  Local properties
  ```
  cp ./etc/local.properties ./android/
  ```

  ENV Variables:
  ```
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

  On Arch linux
  Read: https://wiki.archlinux.org/index.php/Java#Switching_between_JVM
  https://aur.archlinux.org/packages/android-sdk/
  ```
   sudo pacman -S jdk8-openjdk # need java 8
   sudo archlinux-java set java-8-openjdk
  ```
  Accept license:
  ```
  cd $ANDROID_HOME/tools/bin
  yes | ./sdkmanager --licenses
  ```
-->

* Clean:
  ```
  rm -rf android ios node_modules
  ```

* To see console log statements run:
  ```
  npx react-native log-android
  ```

* Run on Android:
  
  Run android emulator:
  ```
  export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
  emulator -avd $(emulator -list-avds)
  ```
  
  Run app:
  ```
  npx react-native run-android
  ```

* Run release version on Android:
  ```
  npx react-native run-android --variant=release
  ```

### Common issues faced

* **"No Java runtime present, requesting install"** on `react-native run-android`.

    set environment variables:  
    `export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"`  
    `export ANDROID_HOME=$HOME/Library/Android/sdk`  
    `export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"`  


* **"error=86, Bad CPU type in executable"** on `react-native run-android`

    in file `gradle-wrapper.properties` set:  
    `distributionUrl=https\://services.gradle.org/distributions/gradle-5.4.1-all.zip`


    change file `build.gradle` to this, [source](https://stackoverflow.com/questions/56743716/could-not-find-com-android-tools-buildgradle5-4-1):
    ```
    // Top-level build file where you can add configuration options common to all sub-projects/modules.

    buildscript {
        repositories {
            google()
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:3.4.1'

            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }

    allprojects {
        repositories {
            mavenLocal()
            google()
            jcenter()
            maven {
                // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
                url "$rootDir/../node_modules/react-native/android"
            }
        }
    }
    ```
