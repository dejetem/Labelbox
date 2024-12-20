FROM python:3.12-slim
ENV PYTHONUNBUFFERED 1
ENV PORT 8000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zbar-tools \
    libzbar-dev \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# create root directory for our project in the container
RUN mkdir /app

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container 
COPY . /app/
COPY .env /app/.env
# Copy SSL certificate
COPY ca.pem /path/to/ca.pem

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


# Collect static files
RUN python manage.py collectstatic --noinput

# Add migration script
COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]