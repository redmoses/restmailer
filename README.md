MailApp
=========

Send emails using REST. The application currently has only one method for sending emails as described below -

# Usage

For sending emails you will have to post the required data to the applications designated URL

## Request

```yaml
Request Type: POST
URL: /sendmail/
```

## Parameters

| Name    | Type   | Required  | Description              |
| ------- |:------:| ---------:| -----------------------: |
| to      | string | True      | Address of the recipient |
| subject | string | True      | Subject of the email     |
| message | string | True      | Email message            |

## Sample request data
An email object

```json
{
  "to": "address@email.com",
  "subject": "Test Subject",
  "message": "This is a test email"
}
```
For a successful request you would have to send an array of this object

```json
[
  {
    "to": "address@email.com",
    "subject": "Test Subject",
    "message": "This is a test email"
  }
]
```
## For sending the same email to multiple addresses

```json
[
  {
    "to": "address@email.com, address2@email.com",
    "subject": "Test Subject",
    "message": "This is a test email"
  }
]
```
## For sending multiple emails

```json
[
  {
    "to": "address@email.com",
    "subject": "Test Subject",
    "message": "This is a test email"
  },
  {
    "to": "address2@email.com",
    "subject": "Test Subject 2",
    "message": "This is a test email number 2"
  }
]
```

## CURL request

I am assuming you are running the app on port 3000 on localhost

```bash
curl -H "Content-Type: application/json" -X POST -d '[{"to":"address@email.com","subject":"Test Subject","message":"This is a test email"}]' http://localhost:3000/sendmail
```
# Deployment (using Docker)

The deployment steps are given below
* Clone the repository using the following command

```bash
git clone git@gitlab.iappdragon.com:moses/mail-app.git
```
* Build the docker image

```bash
# i'm assuming you've cloned the app in 'mail-app' directory
cd mail-app
make build
```
* Configure the application with mail information. The application requires 4 values to be pre-configured before it can send emails. They are

  * MAIL_HOST - the SMTP server host
  * MAIL_PORT - SMTP server port, default value is 25
  * MAIL_FROM - the SMTP address for the app
  * MAIL_USER - the SMTP server username
  * MAIL_PASS - the SMTP server password

You can copy the example config file 'example.conf' to a new file called 'prod.conf'. After that put in your relevant information on this file, replacing the dummy values.
```bash
# i'm assuming you are inside the app directory
cp example.conf prod.conf
vim prod.conf
```
* Run the application with the following command

```bash
make start
```
# Management (Docker)

You can manage the docker container by using the following Makefile commands

```bash
# start app
make start
# stop app
make stop
# restart app
make restart
# see logs
make logs
# shell access
make shell
```
Feel free to play around with the Makefile and add your own commands if necessary
