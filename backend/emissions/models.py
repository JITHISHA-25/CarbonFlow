
from django.db import models

class Tenant(models.Model):
    name = models.CharField(max_length=200)

class DataSource(models.Model):
    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL')
    ]

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class RawRecord(models.Model):
    source = models.ForeignKey(DataSource, on_delete=models.CASCADE)
    raw_payload = models.JSONField()
    status = models.CharField(max_length=20, default='PENDING')

class NormalizedRecord(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED')
    ]

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    source_type = models.CharField(max_length=50)

    category = models.CharField(max_length=100)
    scope = models.CharField(max_length=50)

    activity_value = models.FloatField()
    unit = models.CharField(max_length=50)

    emissions_kg_co2e = models.FloatField()

    suspicious = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)

class AuditLog(models.Model):
    record = models.ForeignKey(NormalizedRecord, on_delete=models.CASCADE)
    action = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)