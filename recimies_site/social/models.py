import ntpath
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MinLengthValidator


def _recipe_image_path(instance, filename):
        return "recimies_site/static/" + "user_img/%s/%s" % (instance.name, ntpath.basename(filename))

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

# Added
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



class RecimieUser(User):
    friends = models.ManyToManyField('self', null=True, symmetrical=False)

    def __repr__(self):
        return str(self.username)

