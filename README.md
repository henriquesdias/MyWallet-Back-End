# MyWallet-Back-End

Do you have problems with managing your money ? So MyWallet application was made for you. You can add a new transaction and keep up with all spendings in a month. 




## About

List of all features implemented in this application: 

- Sign Up
- Sign In
- List all transactions
- Add a new gain
- Add a new spending
- Delete any transaction
- Update any transaction


## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://camo.githubusercontent.com/84e40cc1b235376f4c7442551fecc84e99bbb6736ef470f7d8e7f9655393e2e1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732532306a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465">
  <img src="https://camo.githubusercontent.com/72e92f69f36703548704a9eeda2a9889c2756b5e08f01a9aec6e658c148d014e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d3445413934423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465">
  <img src="https://camo.githubusercontent.com/93c855ae825c1757f3426f05a05f4949d3b786c5b22d0edb53143a9e8f8499f6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d3332333333303f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d463744463145">
</p>

## How to run

1. Clone this repository
2. Install dependencies
```bash
npm i
```
3. Run the mongo database server
```bash
mongod --dbpath ~/.mongo
```
  If you don't have mongoDB installed, access: [Link](https://mongodb.com)

4. Create a .env file e set up the following variables: 

```code
  PORT=
  MONGO_URI=
```
5. Execute one of the following scripts <br />
 
```bash
  npm run dev #dev mode
```

```bash
  npm start #prod mode
```

6. Finally access http://localhost:3000 on your browser. In this case my PORT variable value is 3000. <br />
To a different value, acess `http://localhost:${PORT}`.

7. Acess <a href="https://github.com/henriquesdias/MyWallet-Front-End" target="_blank">MyWallet Front-End</a> and configure front-end application, connecting the BASE_URL to `http://localhost:${PORT}`
