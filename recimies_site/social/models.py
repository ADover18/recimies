import ntpath
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MinLengthValidator
from django.db.models.signals import post_save
from django.dispatch import receiver


def _recipe_image_path(instance, filename):
        return "recimies_site/static/" + "user_img/%s/%s" % (instance.name, ntpath.basename(filename))

def _user_image_path(instance, filename):
        return "recimies_site/static/" + "user_img/profile_pic/%s/%s" % (instance.profile_name, ntpath.basename(filename))

class Recipe(models.Model):
    name = models.CharField(max_length=255, null=False, error_messages={'required': 'Please enter the recipe name', 'blank': 'Please enter the recipe name', 'null': 'Please enter the recipe name'}, validators=[MinLengthValidator(1, message="Please enter a recipe name.")])
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipes")
    image = models.ImageField(upload_to=_recipe_image_path)
    cooking_time = models.IntegerField(default=0)
    cooking_time_units = models.CharField(max_length=25, choices=[('minutes', 'minutes'), ('hours', 'hours')], default='minutes')
    prep_time = models.IntegerField(null=False, default=0, validators=[MinValueValidator(1, message="Must be over 0")])
    prep_time_units = models.CharField(max_length=20, choices=[('minutes', 'minutes'), ('hours', 'hours')], default='minutes')
    serves = models.IntegerField(null=False, default=1, validators=[MinValueValidator(1, message="Must be over 0")])
    equipment = models.TextField(blank=True)


    def __str__(self):
        return self.name + " - " + str(self.user)

    def image_url(self):
        return str(self.image)[14:]
    

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='ingredients', on_delete=models.CASCADE)
    ingredient = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=20, choices=[
        (' ', ' '), ('g', 'g'), ('kg', 'kg'), ('oz', 'oz'), ('lb', 'lb'), ('ml', 'ml'), ('l', 'l'), ('cup', 'cup'), ('cups', 'cups'), ('pinch', 'pinch'), ('tsp', 'tsp'), ('tbsp', 'tbsp'), ('fl oz', 'fl oz'), ('pint', 'pint'), ('pints', 'pints'), ('quart', 'quart'), ('quarts', 'quarts'), ('gallon', 'gallon'), ('gallons', 'gallons'), ('whole', 'whole'), ('large', 'large'), ('small', 'small'), ('medium', 'medium'), ('sprinkle', 'sprinkle'), ('pinch', 'pinch'), ('dash', 'dash'), ('dollop', 'dollop'), ('dollops', 'dollops'), ('scoop', 'scoop'), ('scoops', 'scoops'), ('pieces', 'pieces'), ('piece', 'piece'), ('can', 'can'), ('cans', 'cans'), ('jar', 'jar'), ('jars', 'jars'), ('tin', 'tin'), ('tins', 'tins'), ('sheet', 'sheet'), ('sheets', 'sheets'), ('handful', 'handful'), ('handfuls', 'handfuls')], default='')


    def __str__(self):
        return str(self.quantity) + " " + self.unit + " " + self.ingredient

class Direction(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='direction', on_delete=models.CASCADE)
    direction = models.TextField()


    def __str__(self):
        return self.direction



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='profile', verbose_name='user', default=0)
    followers = models.ManyToManyField(User, blank=True, related_name='followers', default=0)
    profile_name = models.CharField(max_length=50, blank=True)
    profile_description = models.TextField(max_length=500, blank=True)
    profile_image = models.ImageField(upload_to=_user_image_path, null=True, blank=True)

    def __str__(self):
        return self.user.username

    def image_url(self):
        if self.profile_image:
            return str(self.profile_image.url)[15:]
        else:
            return 'static/site_img/profile.png'

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()