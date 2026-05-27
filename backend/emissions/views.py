import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Tenant,
    DataSource,
    RawRecord,
    NormalizedRecord,
    AuditLog
)

from .serializers import NormalizedRecordSerializer

from .utils import (
    normalize_unit,
    calculate_emissions,
    detect_suspicious,
    calculate_travel_emissions  

)


# ==============================
# SAP UPLOAD
# ==============================

@api_view(['POST'])
def upload_sap(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    tenant, created = Tenant.objects.get_or_create(
        name='Demo Company'
    )

    source = DataSource.objects.create(
        tenant=tenant,
        source_type='SAP'
    )

    for index, row in df.iterrows():

        RawRecord.objects.create(
            source=source,
            raw_payload=row.to_dict()
        )

        value, unit = normalize_unit(
            float(row['quantity']),
            row['unit']
        )

        emissions = calculate_emissions(
            value,
            'fuel'
        )

        suspicious = detect_suspicious(value)

        NormalizedRecord.objects.create(
            tenant=tenant,
            source_type='SAP',
            category='fuel',
            scope='Scope 1',
            activity_value=value,
            unit=unit,
            emissions_kg_co2e=emissions,
            suspicious=suspicious
        )

    return Response({
        "message": "SAP uploaded successfully"
    })


# ==============================
# UTILITY UPLOAD
# ==============================

@api_view(['POST'])
def upload_utility(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    tenant, created = Tenant.objects.get_or_create(
        name='Demo Company'
    )

    source = DataSource.objects.create(
        tenant=tenant,
        source_type='UTILITY'
    )

    for index, row in df.iterrows():

        RawRecord.objects.create(
            source=source,
            raw_payload=row.to_dict()
        )

        usage = float(row['usage_kwh'])

        emissions = calculate_emissions(
            usage,
            'electricity'
        )

        suspicious = detect_suspicious(usage)

        NormalizedRecord.objects.create(
            tenant=tenant,
            source_type='UTILITY',
            category='electricity',
            scope='Scope 2',
            activity_value=usage,
            unit='kWh',
            emissions_kg_co2e=emissions,
            suspicious=suspicious
        )

    return Response({
        "message": "Utility data uploaded successfully"
    })
@api_view(['POST'])
def upload_travel(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    tenant, created = Tenant.objects.get_or_create(
        name='Demo Company'
    )

    source = DataSource.objects.create(
        tenant=tenant,
        source_type='TRAVEL'
    )

    for index, row in df.iterrows():

        RawRecord.objects.create(
            source=source,
            raw_payload=row.to_dict()
        )

        distance = float(row['distance_km'])

        mode = row['transport_mode']

        emissions = calculate_travel_emissions(
            distance,
            mode
        )

        suspicious = detect_suspicious(distance)

        NormalizedRecord.objects.create(
            tenant=tenant,
            source_type='TRAVEL',
            category='business_travel',
            scope='Scope 3',
            activity_value=distance,
            unit='km',
            emissions_kg_co2e=emissions,
            suspicious=suspicious
        )

    return Response({
        "message": "Travel data uploaded successfully"
    })


# ==============================
# GET RECORDS
# ==============================

@api_view(['GET'])
def get_records(request):

    records = NormalizedRecord.objects.all().order_by('-created_at')

    serializer = NormalizedRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)


# ==============================
# APPROVE RECORD
# ==============================

@api_view(['POST'])
def approve_record(request, pk):

    record = NormalizedRecord.objects.get(id=pk)

    record.status = 'APPROVED'

    record.save()

    AuditLog.objects.create(
        record=record,
        action='Approved'
    )

    return Response({
        "message": "Record approved"
    })
@api_view(['POST'])
def reject_record(request, pk):

    try:

        record = NormalizedRecord.objects.get(id=pk)

        record.status = "REJECTED"

        record.save()

        return Response({
            "message": "Record rejected"
        })

    except NormalizedRecord.DoesNotExist:

        return Response(
            {"error": "Record not found"},
            status=404
        )
@api_view(['DELETE'])
def clear_records(request):

    NormalizedRecord.objects.all().delete()

    RawRecord.objects.all().delete()

    DataSource.objects.all().delete()

    return Response({
        "message": "All records cleared"
    })