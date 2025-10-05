from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.utils import timezone
import json 
from .models import Form, FormSubmission,Notification
from .serializers import FormSerializer, FormSubmissionSerializer, NotificationSerializer
from .tasks import send_submission_notification


# Create your views here.
class FormsView(APIView):
    def get(self, request):
        forms = Form.objects.all()
        serializer = FormSerializer(forms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class FormByIdView(APIView):
    def get(self, request, id):
        form = get_object_or_404(Form, id=id)
        serializer = FormSerializer(form)
        return Response(serializer.data)

class FormByNameView(APIView):
    def get(self, request, name):
        form = get_object_or_404(Form, name__iexact=name)
        serializer = FormSerializer(form)
        return Response(serializer.data)

class FormsCountView(APIView):
    def get(self, request):
        return Response({"forms_count": Form.objects.count()})

class FormSubmissionView(APIView):
    def get(self, request):
        submissions = FormSubmission.objects.all()
        serializer = FormSubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    def post(self, request, id, *args, **kwargs):
        form = get_object_or_404(Form, id=id)

        # Parse data JSON
        try:
            data = json.loads(request.data.get("data", "{}"))
        except Exception:
            data = {}

        # Handle files
        for field_name, uploaded_file in request.FILES.items():
            path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
            data[field_name] = path  # store file path inside the JSON data

        # Save submission
        submission = FormSubmission.objects.create(form=form, data=data)

        # Create notification (set status "pending")
        notification = Notification.objects.create(
            submission=submission,
            status="pending"
        )
        # Trigger Celery task here
        send_submission_notification.apply_async(args=[notification.id], countdown=5)

        return Response({
            "id": submission.id,
            "data": submission.data,
            "notification": {
                "id": notification.id,
                "status": notification.status,
                "created_at": notification.created_at
            }
        }, status=201)
class SubmissionsCountView(APIView):
    def get(self, request):
        return Response({"submissions_count": FormSubmission.objects.count()})

        
class NotificationView(APIView):
    def get(self, request):
        submissions = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)



