from django.test import TestCase
from forms.models import Form,FormSubmission, Notification

class FormModelTest(TestCase):
    def test_create_form(self):
        form = Form.objects.create(
            name="Registration Form",
            description="A test form",
            config={"fields": ["username", "email", "password"]}
        )
        self.assertEqual(form.name, "Registration Form")
        self.assertEqual(form.description, "A test form")
        self.assertEqual(form.config, {"fields": ["username", "email", "password"]})
        self.assertEqual(str(form), "Registration Form")