# AD Proxy

This repo contains a node application that serves as a proxy service between all City of Pittsburgh client applications that interface with Active Directory via the Microsoft Graph API.

## Authorization

Bearer token.  Just ask for it

## Access & Refresh Tokens

Communication with the MS Graph API is facilitated through an OAuth flow.  An access token must accompany every request.  Access tokens have a shelf life of approximately 10 minutes.  Access tokens are generated from refresh tokens. 

For the Graph endpoints being targeted here, the refresh token does not expire, and will not need regenerated.

## File structure
    .
    ├── models                  # Data transformations
    ├── routes                  # All endpoints, grouped by application
    ...                   
    ├── refresh.js              # Generates a new access token per call
    ├── server.js               # Entry point, Express config
    ...
    └── README.md

## API Documentation

Swagger UI: https://active-directory.azurewebsites.us/docs

## Running Locally

### Prerequisites

* [Node.js](https://nodejs.org) - JS runtime
* .env - See .env.example for all required secrets

### Installation
```
git clone https://github.com/CityofPittsburgh/active-directory 
cd active-directory
npm install
node server.js
```

## Deployment

Both staging and production services are hosted in Azure.  Application is deployed directly from github, and can be triggered either (a) through the Azure GUI, (b) through the [CLI](https://docs.microsoft.com/en-us/cli/azure/webapp/deployment/source?view=azure-cli-latest#az-webapp-deployment-source-sync), or (c) through the [proxy service](https://github.com/ssskram/azure-proxy).

For complete documentation on the azure environment, see [here](https://github.com/CityofPittsburgh/all-things-azure.git).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


