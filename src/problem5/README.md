# 99tech CODING TEST

## Installation

1. Clone the Repo:

```sh
git clone https://github.com/nqqduy/NguyenQuocDuy.git 99tech
```

2. Navigate to the project directory:

```sh
cd 99tech/src/problem5
```

3. Install dependencies

```sh
npm i
```

4. Install and set up database

If you haven't installed Docker, please install Docker from the following [here](https://docs.docker.com/engine/install/)

Set up database with Docker

```
docker compose up -d
```

6. Fill database configuration in .env.development file

```
# --- SERVER ---
NODE_ENV=development
PORT=3000


# --- DATABASE ---
DB_NAME=99tech
DB_USERNAME=99tech
DB_PASSWORD='abcd1xyz2345#$!@'
DB_HOST=localhost
DB_PORT=5432
```

You can change configuration in docker-compose.yml

7. Run migration

```sh
npm run migration:run
```

Note: you can check the package.json file for more commands \
If you want to create a migration

```sh
npm run migration:create <file_name>
```

If you want to revert:

```sh
npm run migration:revert
```

## USAGE

1. First of all, please fill configuration in .env file

```
NODE_ENV=development
PORT=3000


# --- DATABASE ---
DB_NAME=99tech
DB_USERNAME=99tech
DB_PASSWORD='abcd1xyz2345#$!@'
DB_HOST=localhost
DB_PORT=5432
```

2. Start project with dev mode

```
npm run dev
```

## Deploy

You should build before starting

```sh
npm run build
npm start
```
