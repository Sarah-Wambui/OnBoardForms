from django.urls import path
from .views import FormsView, FormByNameView, FormByIdView,FormSubmissionView,FormsCountView,SubmissionsCountView


urlpatterns = [
    path('forms/', FormsView.as_view(), name='forms'),
    path("forms/count/", FormsCountView.as_view(), name="forms-count"),
    path('forms/<int:id>/', FormByIdView.as_view(), name='form-by-id'),
    path("forms/<str:name>/", FormByNameView.as_view(), name="form-by-name"),
    path("forms/<int:id>/submit/", FormSubmissionView.as_view(), name="form-submit"),
    path("submissions/", FormSubmissionView.as_view(), name="submission-list"),
    path("submissions/count/", SubmissionsCountView.as_view(), name="submissions-count"),
]