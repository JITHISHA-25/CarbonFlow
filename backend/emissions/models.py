from django.db import models


class Tenant(models.Model):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class NormalizedRecord(models.Model):

    STATUS_CHOICES = [

        ("PENDING", "Pending"),

        ("APPROVED", "Approved"),

        ("REJECTED", "Rejected"),
    ]


    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE
    )

    category = models.CharField(max_length=100)

    scope = models.CharField(max_length=50)

    activity_value = models.FloatField()

    unit = models.CharField(max_length=50)

    emissions_kg_co2e = models.FloatField()

    suspicious = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    source_type = models.CharField(
        max_length=50,
        default="SAP"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.category} - {self.scope}"