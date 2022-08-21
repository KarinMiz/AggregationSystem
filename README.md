
# Aggregation system.

Our projects help provide an option to report the activity
of the robots and counting the amount of the alerts for each robot.
The project provides statistical data regarding the activity of the robots: 
* Top 10 robots last minute with the largest number of alerts:
* Top 10 robots last hour with the largest number of alerts.
* All robots that crashed in the last 24 hours and at what time(s).

## API Reference

#### Post robots data

```http
  POST 127.0.0.1:3000/
```

| Parameter      | Type     | Description   |
| :------------- | :------- | :------------ |
| `timestamp`    | `Number` | **Required**. |
| `robotId`      | `String` | **Required**. |
| `alertsNumber` | `Number` | **Required**. |

#### Get item

```http
  POST 127.0.0.1:3000/statistics
```
send back a JSON object that includes the following:

● Top 10 robots last minute with the largest number of alerts:

● Top 10 robots last hour with the largest number of alerts.

● All robots that crashed in the last 24 hours and at what time(s).

## Installation

```bash
  npm install 
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` = development

`PORT` = 3000

`DATABASE_URL` = mongodb://127.0.0.1/mydb


## 🛠 Skills
NodeJS


## Screenshots

https://ibb.co/z5y5qjH

https://ibb.co/YPjx6xs

https://ibb.co/x6zqpvM


## Tech Stack

**Server:** Node, Express

