Api where customers can buy tickets for certain trains.

https://trein-api.herokuapp.com

API tester: /tester
# API Endpoints table of contents
<a name="#auth"></a>
# Auth
- [POST - /api/auth](#post---apiauth)
<a name="#customer"></a>
# Customers
Example: {"_id":"646cb15c0bfcb29e031c1b2a","firstname":"test1","lastname":"test1","email":"`test@test.com`","password":"$2b$10$d2us9iSN4K6GKBjQ0XCul.CABxx91dUMgoqVWCdjSwNhYOoUcpAQy","isAdmin":true}

"isAdmin": true  -> Admin

"isAdmin": false -> Customer

no isAdmin field -> Customer

- [GET - /api/customers](#get---apicustomers)
- [GET - /api/customers/:id](#get---apicustomersid)
- [POST - /api/customers](#post---apicustomers)
<a name="#station"></a>
# Stations
Example: {"_id":"646cb4b3b704b43d44d44f10","name":"Amsterdam"}

- [GET - /api/stations](#get---apistations)
- [GET - /api/stations/:id](#get---apistationsid)
- [POST - /api/stations](#post---apistations)
- [DELETE - /api/stations/:id](#delete---apistationsid)
<a name="#train"></a>
# Trains
Example: {"_id":"646cb723b704b43d44d44f16","departureStation":"646cb44eb704b43d44d44f0c","arrivalStation":"646cb43db704b43d44d44f04","departureTime":"10:00:00","arrivalTime":"12:00:00"}

- [GET - /api/trains/getall](#get---apitrainsgetall)
- [GET - /api/trains/:id](#get---apitrainsid)
- [GET - /api/trains?departureStation=Example&arrivalStation=Example](#get---apitrainsdeparturestationexamplearrivalstationexample)
- [POST - /api/trains](#post---apitrains)
- [DELETE - /api/trains/:id](#delete---apitrainsid)
<a name="#ticket"></a>
# Tickets
Example: {"_id":"646ce3fc4ae1bc8a8e8f1786","trainId":"646cb723b704b43d44d44f16","seatNumber":"A1","dateOfTravel":"2023-05-25"}

- [GET - /api/tickets](#get---apitickets)
- [GET - /api/tickets/:id](#get---apiticketsid)
- [POST - /api/tickets](#post---apitickets)
- [DELETE - /api/tickets/:id](#delete---apiticketsid)
<a name="#order"></a>
# Orders
Example: {"_id":"646ce3fc4ae1bc8a8e8f1783","customer":"646ce030849380059997fd23","tickets":["646ce3fc4ae1bc8a8e8f1786"],"completed":false}

- [GET - /api/orders](#get---apiorders)
- [GET - /api/orders/:id](#get---apiordersid)
- [POST - /api/orders](#post---apiorders)
- [PUT - /api/orders/addTicket/:id](#put---apiordersaddticketid)
- [PUT - /api/orders/removeTicket/:id](#put---apiordersremoveticketid)


---

# API Endpoints

## Authorization
<a name="#post---apiauth"></a>
### POST - /api/auth
**Body Request**
- Email (string)(required)
- Password (string)(required)

**Return type:** x-auth-token

---
## Customers
<a name="#get---apicustomers"></a>
### GET - /api/customers

**Return type:** List of [Customer](#customers)

---
<a name="#get---apicustomersid"></a>
### GET - /api/customers/:id
**Path Parameters**
- id (required)

**Return type:** [Customer](#customers)

---
<a name="#post---apicustomers"></a>
### POST - /api/customers
**Body Request**
- firstname (string)(required)
- lastname (string)(required)
- email (string)(required)
- password (string)(required)

**Return type:** [Customer](#customers)

---
## Stations
<a name="#get---apistations"></a>
### GET - /api/stations

**Return type:** List of [Station](#stations)

---
<a name="#get---apistationsid"></a>
### GET - /api/stations/:id
**Path Parameters**
- id (required)

**Return type:** [Station](#stations)

---
<a name="#post---apistations"></a>
### POST - /api/stations
**Body Request**
- name (string)(required)

**Request Headers**
- x-auth-token (Admin)(required)

**Return type:** [Station](#stations)

---
<a name="#delete---apistationsid"></a>
### DELETE - /api/stations/:id
**Path Parameters**
- id (required)

**Request Headers**
- x-auth-token (Admin)(required)

**Return type:** [Station](#stations)

---
## Trains
<a name="#get---apitrainsgetall"></a>
### GET - /api/trains/getall

**Return type:** List of [Train](#trains)

---
<a name="#get---apitrainsid"></a>
### GET - /api/trains/:id
**Path Parameters**
- id (required)

**Return type:** [Train](#trains)

---
<a name="#get---apitrainsdeparturestationlondenarrivalstationbrussel"></a>
### GET - /api/trains?departureStation=Example&arrivalStation=Example
**Query Parameters**
- departureStation (string)(required)
- arrivalStation (string)(required)

**Return type:** List of [Train](#trains)

---
<a name="#post---apitrains"></a>
### POST - /api/trains
**Body Request**
- departureStation (string)(required)
- arrivalStation (string)(required)
- departureTime (string)(required)
- arrivalTime (string)(required)

**Request Headers**
- x-auth-token (Admin)(required)

**Return type:** [Train](#trains)

---
<a name="#delete---apitrainsid"></a>
### DELETE - /api/trains/:id
**Path Parameters**
- id (required)

**Request Headers**
- x-auth-token (Admin)(required)

**Return type:** [Train](#trains)

---
## Tickets
<a name="#get---apitickets"></a>
### GET - /api/tickets

**Return type:** List of [Ticket](#tickets)

---
<a name="#get---apiticketsid"></a>
### GET - /api/tickets/:id
**Path Parameters**
- id (required)

**Return type:** [Ticket](#tickets)

---
<a name="#post---apitickets"></a>
### POST - /api/tickets
**Body Request**
- departureStation (string)(required)
- arrivalStation (string)(required)
- departureTime (string)(required)
- arrivalTime (string)(required)

**Request Headers**
- x-auth-token (Customer)(required)

**Return type:** [Ticket](#tickets)

---
<a name="#delete---apiticketsid"></a>
### DELETE - /api/tickets/:id
**Path Parameters**
- id (required)

**Request Headers**
- x-auth-token (Admin)(required)

**Return type:** [Ticket](#tickets)

---

## Orders
<a name="#get---apiorders"></a>
### GET - /api/orders

**Return type:** List of [Order](#orders)

---
<a name="#get---apiordersid"></a>
### GET - /api/orders/:id
**Path Parameters**
- id (required)

**Return type:** [Order](#orders)

---
<a name="#post---apiorders"></a>
### POST - /api/orders
**Body Request**
Empty

**Request Headers**
- x-auth-token (Customer)(required)

**Return type:** [Order](#orders)

---
<a name="#put---apiordersaddticketid"></a>
### PUT - /api/orders/addTicket/:id
**Path Parameters**
- id (required)

**Request Headers**
- x-auth-token (Customer)(required)

**Return type:** [Order](#orders)

---
<a name="#put---apiordersremoveticketid"></a>
### PUT - /api/orders/removeTicket/:id
**Path Parameters**
- id (required)

**Request Headers**
- x-auth-token (Customer)(required)

**Return type:** [Order](#orders)
