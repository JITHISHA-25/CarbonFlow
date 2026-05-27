from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tenant, NormalizedRecord
from .serializers import NormalizedRecordSerializer
import pandas as pd


@api_view(['GET'])
def get_records(request):

    records = NormalizedRecord.objects.all().order_by('-created_at')

    serializer = NormalizedRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def upload_sap(request):

    file = request.FILES.get('file')

    if not file:

        return Response(
            {"error": "No file uploaded"},
            status=400
        )

    try:

        df = pd.read_csv(file)

        tenant, _ = Tenant.objects.get_or_create(
            name="Default Tenant"
        )

        created_records = []

        for _, row in df.iterrows():

            activity_value = float(row['activity_value'])

            emissions = activity_value * 2.5

            suspicious = emissions > 50000

            record = NormalizedRecord.objects.create(

                tenant=tenant,

                category=row['category'],

                scope=row['scope'],

                activity_value=activity_value,

                unit=row['unit'],

                emissions_kg_co2e=emissions,

                suspicious=suspicious,

                status="PENDING",

                source_type="SAP"
            )

            created_records.append(record)

        serializer = NormalizedRecordSerializer(
            created_records,
            many=True
        )

        return Response(serializer.data)

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=500
        )


@api_view(['POST'])
def upload_utility(request):

    return upload_sap(request)


@api_view(['POST'])
def upload_travel(request):

    return upload_sap(request)


@api_view(['POST'])
def approve_record(request, pk):

    try:

        record = NormalizedRecord.objects.get(id=pk)

        record.status = "APPROVED"

        record.save()

        return Response({
            "message": "Record approved"
        })

    except NormalizedRecord.DoesNotExist:

        return Response(
            {"error": "Record not found"},
            status=404
        )


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

    return Response({
        "message": "All records deleted"
    })