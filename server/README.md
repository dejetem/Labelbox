# Getting Started

In the project directory, you can run:
## Setup to run the application

### `create a .env and copy the data from the .env.example file in the .env and input the required data`
### `docker compose build`
### `docker compose up`
### `docker exec -it <container_name_or_id> python manage.py migrate` 

## Available Scripts

To makemigrations
### `docker ps`
### `docker exec -it <container_name_or_id> python manage.py makemigrations` 

To run migration
### `docker ps`
### `docker exec -it <container_name_or_id> python manage.py migrate` 

Runs the app in the development mode.\
BaseUrl ### `http://127.0.0.1:8000`