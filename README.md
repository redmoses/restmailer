MailApp
=======

Send emails using REST. The application currently has only one method for sending emails as described below -

#### Usage Description
For sending emails you will have to post the required data to the applications designated URL

##### Request
```yaml
Request Type: POST
URL: /sendmail/
```
##### Parameters
```yaml
Name: to
Required: true
```
```yaml
Name: subject
Required: false
```
```yaml
Name: message
Required: false
```

##### Sample request data
```json
{
    "to": "to@email.com",
    "subject": "Test Subject",
    "message": "This is a test email"
}
```

#### CURL request from command line for sending email
I am assuming you are running the app on port 3000 on localhost
```shell
curl -H "Content-Type: application/json" -X POST \
-d '[{"to":"to@email.com","subject":"Test Subject","message":"This is a test email"}]' \
http://localhost:3000/sendmail
```
