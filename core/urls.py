from .views import current_user, UserList
from django.urls import path

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
