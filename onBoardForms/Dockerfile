# Step 1: Use official Python base image
FROM python:3.10-slim

# Step 2: Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Step 3:  Set the working directory in the container
WORKDIR /app

# Step 4: Install system dependencies (for Pillow, mysqlclient, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Step 5: Copy only requirements first (for caching)
COPY requirements.txt .

# Step 6: Install Python dependencies
RUN pip install -r requirements.txt

# Step 7:  Copy the application code to the container
COPY . .

# Step 8: Expose the port the app runs on
EXPOSE 8000

# Step 9: Run migrations and start Django server
CMD ["gunicorn", "onBoardForms.wsgi:application", "--bind", "0.0.0.0:8000"]