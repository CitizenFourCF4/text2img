from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def save(self):
        username = self.validated_data['username']
        password = self.validated_data['password']
        email = self.validated_data['email']
        
        if User.objects.filter(username = username).exists():
            raise serializers.ValidationError("User already exists")
        elif User.objects.filter(email = email).exists():
            raise serializers.ValidationError("Email already exists")
        
        account = User(username=username, email=email)
        account.set_password(password) # если передать пароль параметром выше, то не будет происходить шифрование
        account.save()
        
        return account 
    
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['username'] = user.username

    return token