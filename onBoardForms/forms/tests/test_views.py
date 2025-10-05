from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from forms.models import Form,FormSubmission

class FormSubmissionViewTest(APITestCase):
    def test_submit_form_creates_submission(self):
        # Create a Form to submit against
        form = Form.objects.create(
            name="Registration Form",
            description="Test form",
            config={"fields": ["name"]}
        )

        # Reverse with the form id
        url = reverse("form-submit", args=[form.id])

        # Data must go into "data" key since your view expects request.data["data"]
        payload = {"data": '{"name": "Sarah"}'}  

        response = self.client.post(url, payload, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FormSubmission.objects.count(), 1)
        submission = FormSubmission.objects.first()
        self.assertEqual(submission.data["name"], "Sarah")
