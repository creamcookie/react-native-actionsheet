
# react-native-ccs-actionsheet

## Getting started

`$ npm install react-native-ccs-actionsheet --save`

### Mostly automatic installation

`$ react-native link react-native-ccs-actionsheet`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-ccs-actionsheet` and add `RNCcsActionsheet.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCcsActionsheet.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNCcsActionsheetPackage;` to the imports at the top of the file
  - Add `new RNCcsActionsheetPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-ccs-actionsheet'
  	project(':react-native-ccs-actionsheet').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-ccs-actionsheet/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-ccs-actionsheet')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNCcsActionsheet.sln` in `node_modules/react-native-ccs-actionsheet/windows/RNCcsActionsheet.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Ccs.Actionsheet.RNCcsActionsheet;` to the usings at the top of the file
  - Add `new RNCcsActionsheetPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNCcsActionsheet from 'react-native-ccs-actionsheet';

// TODO: What to do with the module?
RNCcsActionsheet;
```
  