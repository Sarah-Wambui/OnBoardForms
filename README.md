# OnBoardForms

OnBoardForms is a Django + React based system for dynamic onboarding forms.  
It allows **admins** to create/manage forms and track submissions, while **clients** can fill out and submit forms with a clean, simple interface.   

## Design Decisions

In designing this platform, I made several technical decisions to balance performance, scalability and maintainability.The data models were designed in a relational structure to preserve data integrity, enable efficient queries and allow extensibility for future requirements. In form configuration I went with JSON editor. The field cofigurations are stored in JSONField for flexibility, allowing dynamic form fields without database migrations. For data persistence, I selected MySQL because of its reliability and strong compatibility with Django ORM. I chose APIView in Django Rest Framework to provide more explicit control over request handling, allowing customized logic for each endpoint rather that relying on the abstractions of generic views. Finally, I used Celery with Redis to handle asynchronous task such as notifications, ensuring that long-running processes do not block user interactions.

## Data Model

I created normalized relational data models for forms, formsubmissions and notifications. Each form, its fields and submitted responses need to be stored in a way that preserves referential integrity. I used foreign key relationship to link submissions to their parent forms. This design allows extensibility i.e adding field types.

## Notification Channel

I used Redis as the message broker and Celery as the task queue. Some operations in the system e.g sending notifications should not block the request/response cycle. Celery is a widely used task queue in Django offering retry mechanisms, scheduling and task monitoring. I chose Redis as the broker because it is lightweight, fast and easy to set up. I settled for Celery + Redis for a balance of maturity, ease of integration, and speed. I also implemented using Django email backend because emails are reliable, universal and low-cost.

## Field Config Strategy

Field configurations are stored in JSONField for flexibility, allowing dynamic form fields database schema changes. Store form field definitions (e.g. label, type, options, validation rules) in a structured, configurable format rather than hardcoding them. This ensures that new fields can be added without changing the application logic. It also helps in supporting different field types in a unified way. 

## UX approach for admins and clients

The admin panel was designed with efficiency and clarity in mind since admins primarily need to create forms and view submissions. I used a simple interface with clear input fields for form configuration. This reduces complexity and mimizes the learning curve for non-technical users. Submissions are presented in a structured table for viewing responses. For clients I chose a clean simple iterface with focus on form completion hence why I placed them without a panel for easier fill and submit.

## Unit Tests

To run the unit test, you need to first set up the project.

### Clone the repository

        git clone https://github.com/Sarah-Wambui/OnBoardForms

        cd OnBoardForms

### Setup Backend
        cd onBoardForms

        python3 -m venv venv

        source venv/bin/activate

        pip install -r requirements.txt

        python manage.py migrate

        python mange.py runserver

### Setup Frontend
        cd onboardui

        npm install

        npm start

### Run Unit Tests

The tests are located in onBoardForms/forms/tests

        cd onBoardForms

        python manage.py test

## Author

Sarah Wambui

https://github.com/Sarah-Wambui/

