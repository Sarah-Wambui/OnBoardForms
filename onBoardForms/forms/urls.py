from django.urls import path
from .views import FormsView, FormByNameView, FormByIdView,FormSubmissionView


urlpatterns = [
    path('forms/', FormsView.as_view(), name='forms'),
    path('forms/<int:id>/', FormByIdView.as_view(), name='form-by-id'),
    path("forms/<str:name>/", FormByNameView.as_view(), name="form-by-name"),
    path("forms/<int:id>/submit/", FormSubmissionView.as_view(), name="form-submit"),
]