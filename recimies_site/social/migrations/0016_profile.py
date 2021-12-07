# Generated by Django 3.2.7 on 2021-12-06 15:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import social.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0015_auto_20211206_1354'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='profile', serialize=False, to='social.recimieuser', verbose_name='user')),
                ('profile_name', models.CharField(max_length=50)),
                ('profile_description', models.TextField(blank=True, max_length=500)),
                ('profile_image', models.ImageField(null=True, upload_to=social.models._user_image_path)),
                ('followers', models.ManyToManyField(blank=True, default=0, related_name='followers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
