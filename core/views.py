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
    replace_text = request_data.get('replace_text')
    print(replace_text)

    def def_flags(flags_arry):
        my_flags=re.MULTILINE # since it doesnt affect the finditer method we can use it as start
        for flag in flags_arry:
            if flag == 'IGNORECASE':
                my_flags += re.IGNORECASE
            if flag == 'UNICODE ':
                my_flags += re.UNICODE
            if flag == 'LOCALE':
                my_flags += re.LOCALE
            if flag == 'VERBOSE':
                my_flags += re.VERBOSE
            if flag == 'DOTALL':
                my_flags += re.DOTALL

        return my_flags


    def find(regex, text, flags):
        result_arr = []
        match_obj = re.finditer(r''+regex, text, flags=flags)
        for match in match_obj:
            result_arr.append(match.group())

        return result_arr

    def replace_func(regex, replace_text, text, flags):
        return re.sub(regex, replace_text, text, flags=def_flags(flags))

    if replace_text is not None:
        res = replace_func(regex, replace_text, text, flags)
    else:
        res = find(regex, text, def_flags(flags))

    return JsonResponse(res, safe=False, status=status.HTTP_200_OK)