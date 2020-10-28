from .views import current_user, UserList, query_regex
from django.urls import path
from rest_framework import routers
from .api import Queryviewset
router = routers.DefaultRouter()
router.register('query', Queryviewset, 'query')

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('query_regex/', query_regex),
]
urlpatterns += router.urls
