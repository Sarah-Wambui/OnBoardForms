from django.conf import settings
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from .models import Notification
import logging

logger = logging.getLogger(__name__)

@shared_task
def send_submission_notification(notification_id):
    try:
        notification = Notification.objects.get(id=notification_id)
        submission = notification.submission

        # Send email to admin
        send_mail(
            subject=f"New Form Submission: {submission.form.name}",
            message=f"A new submission was received.\n\nData:\n{submission.data}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["sarahwambui843@gmail.com"],
        )

        # Update notification as sent
        notification.status = "sent"
        notification.sent_at = timezone.now()
        notification.save()

    except Exception as e:
        print(f"Email sending failed for notification {notification_id}: {e}")
        logger.error(f"Email sending failed for notification {notification_id}: {e}")
        notification = Notification.objects.get(id=notification_id)
        notification.status = "failed"
        notification.save()