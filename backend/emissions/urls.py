from django.urls import path

from .views import (
    get_records,
    upload_sap,
    upload_utility,
    upload_travel,
    approve_record,
    reject_record,
    clear_records
)

urlpatterns = [

    path('records/', get_records),

    path('upload/sap/', upload_sap),

    path('upload/utility/', upload_utility),

    path('upload/travel/', upload_travel),

    path('approve/<int:pk>/', approve_record),

    path('reject/<int:pk>/', reject_record),

    path('clear/', clear_records),
]