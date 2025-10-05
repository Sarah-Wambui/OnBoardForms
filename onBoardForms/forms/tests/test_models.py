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

class FormSubmissionTest(TestCase):
    def test_create_submission(self):
        form = Form.objects.create(
            name="Registration Form",
            description="Test form",
            config={"fields": ["name", "email"]}
        )
        submission = FormSubmission.objects.create(
            form=form,
            data={"name": "Sarah"}
        )
        self.assertEqual(submission.data["name"], "Sarah")
        self.assertEqual(submission.form, form)


class NotificationModelTest(TestCase):
    def test_create_notification(self):
        form = Form.objects.create(
            name="Contact Form",
            description="Test form",
            config={"fields": ["email"]}
        )
        submission = FormSubmission.objects.create(
            form=form,
            data={"email": "user@example.com"}
        )
        notif = Notification.objects.create(
            submission=submission,
            status="pending"
        )
        self.assertEqual(notif.status, "pending")
        self.assertEqual(notif.submission, submission)
        self.assertEqual(notif.submission.form, form) 