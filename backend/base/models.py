from django.db import models
from django.contrib.auth.models import User


class Chat(models.Model):
    title = models.CharField(max_length=1000, default='New Chat')
    user = models.ForeignKey(User, related_name="chat_owner", on_delete=models.CASCADE, default='unauthorized')
    created_at = models.DateTimeField(auto_now_add=True)
    href = models.CharField(max_length=100, null=False, default='')


class Message(models.Model):
    message = models.CharField(max_length=1000, default='')
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='unauthorized')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
