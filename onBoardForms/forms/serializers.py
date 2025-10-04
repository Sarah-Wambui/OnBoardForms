from rest_framework import serializers
from .models import Form, FormSubmission, Notification

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = "__all__"

class FormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmission
        fields = "__all__"

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"