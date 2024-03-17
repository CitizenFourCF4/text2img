from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Message, Chat
from django.core.serializers import serialize
from rest_framework.decorators import api_view
from .serializers import UserRegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


    
@api_view(["POST"])
def user_register_view(request):
    serializer = UserRegisterSerializer(data=request.data)

    if serializer.is_valid():
        try:
            account = serializer.save()
            refresh = RefreshToken.for_user(account)
            return Response({'status': 'Account has been created successfully',
                             'token': {
                                 'refresh': str(refresh),
                                 'access': str(refresh.access_token)
                             }}, status=200)
        except Exception as e:
            return Response(e, status=400)
        
    return Response(serializer.errors, status=400)


class ChatlistView(APIView):
  def post(self, request):
    user = User.objects.get(username=request.data['user_login'])
    chats_belongs_to_user = Chat.objects.filter(user=user)
    output = [
      {
        'id': chat.id,
        'title': chat.title,
        'created_at': chat.created_at,
      }
    for chat in chats_belongs_to_user] 
    return Response(output[::-1])
  

class ChatView(APIView):
  def get(self, request,pk):
    messages = Message.objects.filter(chat=pk)
    output = [
      {
        'message': obj.message,
        'author': obj.user.username,
        'created_at': obj.created_at,
      }
    for obj in messages]
    return Response(output)
    
  

class CreateChatView(APIView):
   def post(self, request):
      chat_title = request.data['chat_title']
      user_login = request.data['user_login']
      user = User.objects.get(username=user_login)

      new_object = Chat.objects.create(
            title = chat_title,
            user = user,
        )
      id = new_object.id
      new_object.href = f'chat/{id}'
      new_object.save()
      return Response({}) 
   

   def put(self,request):
      chat_instance = Chat.objects.get(id=request.data['chat_id'])
      chat_instance.title = request.data['new_title']
      chat_instance.save()
      return Response({}) 



   def delete(self, request):
      chat = Chat.objects.filter(id=request.data['chat_id'])
      chat.delete()
      return Response({}) 


class AddMessageView(APIView):
    def post(self, request):
        author = User.objects.get(username=request.data['author'])
        chat = Chat.objects.get(id=request.data['chat_id'])
        Message.objects.create(
            user = author,
            chat = chat,
            message = request.data['message']
        )
        return Response({})






class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer