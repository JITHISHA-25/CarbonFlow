from django.urls import path
from .views import *

urlpatterns = [
    path('upload/sap/', upload_sap),
    path('records/', get_records),
    path('approve/<int:pk>/', approve_record),
    path('upload/utility/', upload_utility),
    path('upload/travel/', upload_travel),
]