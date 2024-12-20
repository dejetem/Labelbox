import cloudinary
import cloudinary.uploader
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Project, Image, Annotation
from .serializers import ProjectSerializer, ImageSerializer, AnnotationSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    @action(detail=False, methods=['POST'])
    def upload(self, request):
        file = request.FILES.get('image')
        project_id = request.data.get('project_id')
        
        if not file or not project_id:
            return Response(
                {'error': 'Both image and project_id are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            upload_result = cloudinary.uploader.upload(file)
            image = Image.objects.create(
                project_id=project_id,
                cloudinary_id=upload_result['public_id'],
                url=upload_result['secure_url']
            )
            return Response(ImageSerializer(image).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AnnotationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AnnotationSerializer

    def get_queryset(self):
        return Annotation.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)