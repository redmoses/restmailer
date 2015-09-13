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