# :react-native: WeatherApp

[Download - APK](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40naua/SpartaLabs-7e375eeaf2be4b66ac6c176ac841d5d1-signed.apk)

<!-- ABOUT THE PROJECT -->

<div align="center">
<img  src="https://user-images.githubusercontent.com/62629609/153515567-3ddc5f44-cda6-4fa1-b044-7196ff75f0fa.jpeg" />
</div>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Naua-stack/SpartaLabs.git
   ```
2. Install Yarn packages
   ```sh
   yarn
   ```
3. Create .env file equal .env.example

4. Enter your API KEY in `.env`
   ```js
    ENV_API_TOKEN_WEATHER=
    ENV_API_TOKEN_GOOGLE=
   ```
5. Run expo start and scan qr-code

## Roadmap

- [x] List cities
- [x] Add cities
- [x] Load weather of listed cities
- [x] Load city weather details
- [x] Delete city
- [x] Favorite city
- [x] Change metric to fahrenheit and celsius

## It uses

- **react-native**
- **zustand**
- **react-query**
- **expo**
- **axios**
