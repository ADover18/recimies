# Generated by Django 3.2.7 on 2021-10-27 14:38

import django.core.validators
from django.db import migrations, models
import social.models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0008_alter_ingredient_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='image',
            field=models.ImageField(upload_to=social.models._recipe_image_path),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='name',
            field=models.CharField(error_messages={'required': 'Please enter the recipe name'}, max_length=255),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='prep_time',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(1, message='Must be over 0')]),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='serves',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, message='Must be over 0')]),
        ),
    ]