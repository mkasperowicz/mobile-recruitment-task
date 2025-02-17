# Mobile Automation Testing with WebdriverIO & Appium

This project is a mobile automation testing framework using **WebdriverIO** and **Appium** to test Android and iOS
applications.

## 📌 Prerequisites

Before running the tests, make sure you have the following installed:

- **Node.js** (LTS, recommended **18+**)
- **Appium Server** (recommended **2.0+**)
- **Java Development Kit (JDK)** (recommended **11+**)
- **Android SDK & AVD** (for Android testing)
- **Xcode & Xcode Command Line Tools** (for iOS testing)
- **WebdriverIO CLI**

## 📥 Installation

### 1️⃣ Clone the repository

```bash
git clone <repository_url>
cd <repository_folder>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install Appium globally

```bash
npm install -g appium
appium driver install uiautomator2
appium driver install xcuitest
```

### 4️⃣ Download the application files

The test applications are not included in this repository. Please download them and place them in the `apps/` folder.

#### 📥 Download the applications

You can download the latest versions from the following link:  
➡️ [Download App Files](https://drive.google.com/drive/folders/1yXUpSE_-fo-BRlwx5xg4qCwRpYw4nHT2?usp=drive_link)

#### 📂 Where to place the files?

Once downloaded, place them in the `apps/` folder in the project root.

#### ⚠️ Important

- The `apps/` folder's content is **ignored in Git**, so you need to manually download and place the files. The folder
  however is already there.
- Ensure the file names match the default values in the configuration or update `APP_PATH` accordingly.

## 🚀 Running Tests

### Prerequisites

Before running tests, make sure that **Appium Server** is running

```bash
appium
```

If you want to use default envs, run the following emulators:

- **Android:** `Pixel_8_Pro_API_35 (Android 15.0)`
- **iOS:** `iPhone 15 (iOS 18.2)`

### Run tests on Android

To run tests on the default Android emulator, use:

```bash
npm run test:android
```

### Run tests on iOS

To run tests on the default iOS simulator or connected device, use:

```bash
npm run test:ios
```

### Run tests on both platforms

To execute tests on both Android and iOS sequentially, use:

```bash
npm run test:all
```

## ⚙️ Environment Variables

You can customize test execution by overriding default values using environment variables.

### Available Environment Variables

| **Variable**               | **Description**                                  | **Default Value**                                                                     | **Available Values**                                |
| -------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `DEVICE_NAME`              | Name of the device or emulator/simulator         | `Pixel_8_Pro_API_35` (Android) / `iPhone 15` (iOS)                                    | Any valid device/emulator name                      |
| `PLATFORM_VERSION`         | OS version of the device                         | `15.0` (Android) / `18.2` (iOS)                                                       | Any valid OS version                                |
| `APP_PATH`                 | Path to the application file                     | `./apps/SauceLabs-Demo-Android.apk` (Android) / `./apps/SauceLabs-Demo-iOS.app` (iOS) | Any valid `.apk` or `.app` file path                |
| `TIMEOUT`                  | Default timeout for waiting elements (ms)        | `10000`                                                                               | Any number (milliseconds)                           |
| `LOG_LEVEL`                | Logging verbosity                                | `info`                                                                                | `trace`, `debug`, `info`, `warn`, `error`, `silent` |
| `MAX_INSTANCES`            | Number of parallel test instances                | `1`                                                                                   | Any number (`1` for sequential execution)           |
| `CONNECTION_RETRY_TIMEOUT` | Timeout for retrying a connection (ms)           | `120000`                                                                              | Any number (milliseconds)                           |
| `CONNECTION_RETRY_COUNT`   | Number of retry attempts for a failed connection | `3`                                                                                   | Any positive integer                                |

### Example Usage

To override values, run tests with the desired environment variables (example for Android, please adjust with desired
values):

```bash
DEVICE_NAME="Pixel_6" PLATFORM_VERSION="14.0" APP_PATH="./apps/Custom-Android.apk" TIMEOUT=15000 MAX_INSTANCES=2 npm run test:android
```

## ℹ️ Additional Information

Before running the tests, ensure that the emulator or physical device is running and detected by Appium.

### 🔍 Android

If you encounter issues with running tests on Android, check the list of connected devices:

```bash
adb devices
```

### 🍏 iOS

If iOS tests are not working, check the list of available simulators:

```bash
xcrun simctl list devices
```

## 🤔 Project Decisions

### 🔹 Why WebdriverIO instead of Selenium?

After some research, I concluded that WebdriverIO is better as it provides built-in support for mobile automation and
Appium. Selenium would require much more configuration and would be more complex solution (as it is primarily designed
for testing web apps). WebdriverIO seems to also have better integration with TypeScript.

### 🔹 Why is the Base class not a singleton, but all other Page Objects are?

The `Base` class serves as a foundation for other page objects. It does not have to be invoked in the tests and serve as
a particular page. It contains shared methods to be used across the page objects. Other Page Objects are singletons to
ensure that each page has only one instance per test execution, preventing unnecessary re-initialization and improving
performance.

### 🔹 Why did we implement `nativeScrollTo()`?

I was super surprised to see how much trouble scrolling is causing in a framework for testing mobile apps. Since I run
into some troubles with Appium's scrolling method, I finally found this solution and with some modifications it proved
to be much more reliable. Ergo, this ensures stabler tests for both platforms. And I tried to check those tests, while
creating page models, in a way that would force some scrolling issues to make sure it would work on other phone
dimensions as well. Even if I could smartly avoid need for scrolling on the default devices, this would not be reliable
for mobile testing.

### 🔹 Why do we validate `TotalValue`?

What the customer pays is one of the most important aspects of purchases. For both sides, the customer and the client.
That's why I wanted to verify if the total was calculated and displayed correctly, regardless of adding and removing
products. It could be improved, given that we can order more than one product of the same kind, but this is improvement
for the future.

### 🔹 Why do we add the checkout selector to the iOS XPath while checking the products?

In iOS, the whole app was written as one view. Which meant that the elements from th products screen were visible in the
DOM even during the filling information step. That caused some difficulties while checking if the correct products were
added to the cart so I needed to limit the scope of search to the desired screen.

### 🔹 Why products are checked during the checkout and not in basket?

The product from the cart can be removed. To do that we need to scroll to the button. Even though I managed to tame
scrolling down, scrolling back up defeated me :D Therefore, I decided to check correct products on the Checkout Step,
avoiding this issue as I have not found suitable and stable solution.

### 🔹 Why do we set autoGrantPermissions: true for Android?

Permissions on Android may be sometimes problematic, therefore, I found in one of the sources that this is a good
practice if we do not care about checking permissions in our tests. It eliminates the need of manual checking the
notifications from the system. It is not needed in this project, though.

### 🔹 Why do we explicitly define appWaitActivity for Android?

Android tests were not running as Appium seemingly waited or a different starting activity. By setting the correct
activity for this app, I ensured that it does not have to guess but identifies the activity immediately.

### 🔹 Why emulators and not real devices?

Unfortunately, at this time I do not have an access to my own Android device.

## 📝 Disclaimer

As mentioned during the talk with the recruiter, this is my first attempt at mobile automation. I have read what I
could, I did some research, I used all the available resources to perform this task to the best of my abilities and
knowledge. Even if I tried to check at any point good practices for mobile automation, I still believe that there may be
places in which those practices may require some better approach. On the other side, I believe that configuring
everything from scratch and writing tests in an unknown framework also proves my abilities of quick adaptation and
general technical knowledge as a Senior QA 😉 Regardless of the result, thank you for this opportunity and experience.
