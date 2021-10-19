import ntpath
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


def _recipie_image_path(instance, filename):
        return "recimies_site/static/" + "user_img/%s/%s" % (instance.name, ntpath.basename(filename))

class Recipie(models.Model):
    name = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipies", null=False)
    image = models.ImageField(upload_to=_recipie_image_path, default=settings.DEFAULT_IMAGE_PATH)
    cooking_time = models.IntegerField(default=0)
    cooking_time_units = models.CharField(max_length=20, default='')
    prep_time = models.IntegerField(null=False, default=0)
    prep_time_units = models.CharField(max_length=20, default='')
    serves = models.IntegerField(null=False, default=0)
    equipment = models.TextField(blank=True)


    def __str__(self):
        return self.name + " - " + str(self.user)

    def image_url(self):
        return str(self.image)[14:]

# Added
class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipie, related_name='ingredients', on_delete=models.CASCADE)
    ingredient = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=100)


    def __str__(self):
        return str(self.quantity) + " " + self.unit + " " + self.ingredient

class MethodStep(models.Model):
    recipe = models.ForeignKey(Recipie, related_name='methodstep', on_delete=models.CASCADE)
    step = models.CharField(max_length=100)


    def __str__(self):
        return str(self.pk) + ". " + self.step



class RecimieUser(User):
    friends = models.ManyToManyField('self', null=True)

    def __repr__(self):
        return str(self.username)
