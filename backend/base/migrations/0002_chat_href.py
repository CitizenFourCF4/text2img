# Generated by Django 4.2.5 on 2024-03-15 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='href',
            field=models.CharField(default='', max_length=100),
        ),
    ]
