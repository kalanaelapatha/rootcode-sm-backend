# RootCodeLabs Social Media Backend Application Guide

This repository contains the backend source code for a social media application.

This is a [Nest JS](https://docs.nestjs.com/) project.

## Setting up the development environment.

### Recommended IDE
We recommend using **Visual Studio Code** for local development. You can download it [here](https://code.visualstudio.com/).

#### Install dependencies

> [!IMPORTANT]
> node version 18.x.x has been used and tested in the dev environment. Not encourage to use any lower version.


Execute below Yarn script in the root directory to install required dependencies.

```bash
yarn install
```

#### Environment configuration
Create **.env** file in your root before run the project.copy bellow details and fill with values that related the your environment
```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=r
```

## Starting the development server

> [!IMPORTANT]
> Prerequisite for the development environment should be configured properly before apply any changes to the application source code. (Refer the **"Setting up the development environment"** section. )

Run the development server with:

```bash
yarn run start:dev
```