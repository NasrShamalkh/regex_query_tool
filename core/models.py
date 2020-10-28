from django.db import models
from django.contrib.auth.models import User

class Query(models.Model):
    query = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, related_name='queries', on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=255, blank=True)

