import re
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status, permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken




# determine the current user by their token and return their data
@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    # create a new user, It's called 'UserList' because normally we would have
    # a get method here too, for retrieving a list of all User objects

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def query_regex(request):
    request_data = JSONParser().parse(request)
    regex =  request_data.get('regex')
    flags = request_data.get('flags')
    text = request_data.get('text')
    def find(regex, text):
        result_arr = []
        match_obj = re.finditer(r''+regex, text)
        for match in match_obj:
            result_arr.append(match.group())

        return result_arr

    res = find(regex, text)

    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)