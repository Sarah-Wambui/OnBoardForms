from django.db import models

# Create your models here.
class Form(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    config = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class FormSubmission(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="submissions")
    data = models.JSONField() 
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission {self.id} for {self.form.name}"

        
class Notification(models.Model):
    submission = models.ForeignKey(FormSubmission, on_delete=models.CASCADE, related_name="notifications")
    status = models.CharField(max_length=20, choices=[("pending", "Pending"), ("sent", "Sent"), ("failed", "Failed")])
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Notification {self.id} for submission {self.submission.id}"