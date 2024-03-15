from django.urls import path
from .views import user_register_view, ChatlistView, MyTokenObtainPairView, CreateChatView, ChatView, AddMessageView
from rest_framework_simplejwt.views import TokenRefreshView 

urlpatterns = [
    
    path("chatlist/", ChatlistView.as_view(), name="chats"),
    path("create_chat/", CreateChatView.as_view(), name="create_chat"),
    path('chat/<str:pk>/', ChatView.as_view(), name='chat'),
    path('add_message/', AddMessageView.as_view(), name='add_message'),


    path("register/", user_register_view, name="register"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]