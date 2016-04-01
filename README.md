# Coupons

Coupons is a nodejs-angular app powered by [cloudboost.io](https://www.cloudboost.io) for creating discount coupons

## Installation

Clone this project 
```bash
$ git clone https://github.com/CloudBoost/Coupons.git
```
Install all dependencies 
```bash
$ cd Coupons
$ npm install
```
This coupon uses cloudboost database service.
- Go to [cloudboost.io](htttps://dashboard.cloudboost.io)'s dashboard and create an app.

Click on 'App Keys' Button
![AppId and AppKey](https://github.com/CloudBoost/Coupons/blob/master/screenshot/app.png)

- Go to 'Manage App'.
- Create a table 'Coupon'

Table Schema
- code - textdescription - text
- percentage - boolean
- amount - number
- limit - number
- validFrom - DateTime
- validUntil - DateTime
- redemCount - number

```javascript
CB.CloudApp.init('appId', 'appKey'); //replace appId and appKey with your app's appId and appKey
```

## Run
```bash
$ node server.js
```
[https://localhost:8000](https:localhost:8000)

## APIs

Generate a random string for coupon code
```javascript
$http.get("/generate/code"); //returns a string
```

Apply a Coupon
```javascript
$http.post("/apply", {"couponId:'ABCD234', amount:1200"}); //retruns total discount on 1500 for given coupon code.
```

Redeem a Coupon
```javascript
$http.post("/redeem", {"couponId:'ABCD234', amount:1200"}); //retruns total discount on 1500 for given coupon code and also increase value of redeem count.
```
Delete a Coupon
```javascript
$http.post("/delete", {"couponId:'ABCD234'});
```
Get List of Coupon
```javascript
$http.post("/couponlist"); //returns list of coupons
```

## Screenshots
![List of coupons](https://github.com/CloudBoost/Coupons/blob/master/screenshot/dashboard.png)
![Creating coupons](https://github.com/CloudBoost/Coupons/blob/master/screenshot/newCoupon.png)
