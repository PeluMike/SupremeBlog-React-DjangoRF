# Generated by Django 3.2 on 2022-08-10 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supremeuser',
            name='date_joined',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
