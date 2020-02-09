# Expense Notes

Playstore: https://play.google.com/store/apps/details?id=com.expensenotes


### Development

* Setup nix  
Follow steps [here](https://gist.github.com/wilspi/aad81f832d030d80fca91dfa264a1f8a) if not done already

* Run `expense-notes-dev` environment 
  ```buildoutcfg
  nix-shell --pure shell.nix
  ```
* Steps to install:
  ```
  npm install
  react-native eject
  react-native link
  ```
* Clean:
  ```
  rm -rf android ios node_modules
  ```
* To see console log statements run
  ```
  react-native log-android
  ```
* Run on Android:
  ```
  react-native run-android
  ```
* Run release version on Android:
  ```
  react-native run-android --variant=release
  ```
