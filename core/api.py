from rest_framework import viewsets, permissions
from .serializers import QuerySerializer


# Lead ViewSet
class Queryviewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = QuerySerializer

    def get_queryset(self):
        return self.request.user.queries.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


