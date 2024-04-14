# URL Shortener [Backend]

![](/github_assets/short-url-banner.png)

It is a URL Shortening service that will help you in shortening your url by which you can get a more precised version of your URL at ease.

## ER Diagram of DB

![](/github_assets/er-diagram.jpg)

## Run Locally

Clone the project

```bash
  git clone https://github.com/anuj-thakur-513/URL-Shortener.git
```

Go to the project directory

```bash
  cd URL-Shortener
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

To test API Endpoints, checkout this [Postman Collection](https://www.postman.com/altimetry-saganist-53324669/workspace/github/collection/17929702-7ff4222d-8e33-4bd3-bd29-4ea32d568e98?action=share&creator=17929702&active-environment=17929702-ba6d93c4-f3a8-4aa5-983e-70fa33d4640d)

## Environment Variables

Change `.env.example` file to `.env` and add the following required variables:

`PORT=8000`

`CORS_ORIGIN='*'`

`MONGO_URI=''`

`ACCESS_TOKEN_SECRET=''`

`ACCESS_TOKEN_EXPIRY='1d'`

`REFRESH_TOKEN_SECRET=''`

`REFRESH_TOKEN_EXPIRY='180d'`

## Project Directory Structure

```
.
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── index.js
    ├── configs
    │   └── authCookie.config.js
    ├── constants.js
    ├── controllers
    │   ├── url.controller.js
    │   └── user.controller.js
    ├── middlewares
    │   └── auth.middleware.js
    ├── models
    │   ├── url.model.js
    │   └── user.model.js
    ├── routes
    │   ├── url.routes.js
    │   ├── user.routes.js
    │   └── version1.routes.js
    ├── services
    │   └── dbConnect.service.js
    └── utils
        ├── ApiError.js
        ├── ApiResponse.js
        └── asyncHandler.js
```

## API Reference

#### POST signup user

```http
  POST /v1/user/signup
```

| Parameter  | Type     | Description                                               |
| :--------- | :------- | :-------------------------------------------------------- |
| `name`     | `String` | **Required**. Name of the user passed in request body     |
| `email`    | `String` | **Required**. Email of the user passed in request body    |
| `password` | `String` | **Required**. Password of the user passed in request body |

#### POST login user

```http
  POST /v1/user/login
```

| Parameter  | Type     | Description                                               |
| :--------- | :------- | :-------------------------------------------------------- |
| `email`    | `String` | **Required**. Email of the user passed in request body    |
| `password` | `String` | **Required**. Password of the user passed in request body |

#### POST logout user

```http
  POST /v1/user/logout
```

| Parameter   | Type   | Description |
| :---------- | :----- | :---------- |
| `No Params` | `None` |             |

### POST update tokens

```http
  POST /v1/user/update-tokens
```

| Parameter      | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `refreshToken` | `string` | **Required**. sent from cookies |

### POST create short URL (only logged in users)

```http
  POST /v1/url/
```

| Parameter | Type       | Description                                                   |
| :-------- | :--------- | :------------------------------------------------------------ |
| `url`     | `string`   | **Required**. URL to shorten                                  |
| `user_id` | `objectId` | **Required**. user id sent from auth middleware using cookies |

### GET all urls created by current user

```http
  GET /v1/url/
```

| Parameter | Type       | Description                                                   |
| :-------- | :--------- | :------------------------------------------------------------ |
| `user_id` | `objectId` | **Required**. user id sent from auth middleware using cookies |

### GET visit created short URL

```http
  GET /v1/url/:shortId
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `shortId` | `string` | **Required**. generated shortId |

### GET analytics of generated short URL (clicks and time at which it was clicked)

```http
  GET /v1/url/analytics/:shortId
```

| Parameter | Type       | Description                                                   |
| :-------- | :--------- | :------------------------------------------------------------ |
| `shortId` | `string`   | **Required**. generated shortId                               |
| `user_id` | `objectId` | **Required**. user id sent from auth middleware using cookies |

## Find this project useful ? ❤️

Support it by clicking the 🌟 button on the upper right of this page. ❤️

## Tech Stack

Node.js

Express.js

MongoDB

## License

```
MIT License

Copyright (c) 2024 Anuj Thakur
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
