# Generated by Django 2.1.3 on 2018-11-14 14:49

from django.db import migrations, models
import social.models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipie',
            name='image',
            field=models.ImageField(default='/static/site_img/default-image.jpg', upload_to=social.models._recipie_image_path),
        ),
    ]
