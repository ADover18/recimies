import ntpath
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


def _recipie_image_path(instance, filename):
        return "static/" + "user_img/%s/%s" % (instance.name, ntpath.basename(filename))

class Recipie(models.Model):
    name = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recipies", null=False)
    content = models.TextField(null=False)
    image = models.ImageField(upload_to=_recipie_image_path, default=settings.DEFAULT_IMAGE_PATH)
    cooking_time = models.IntegerField(default=0)
    prep_time = models.IntegerField(null=False, default=0)
    serves = models.IntegerField(null=False, default=0)
    equipment = models.TextField(blank=True)

    def __str__(self):
        return self.name + " - " + str(self.user)


class RecimieUser(User):
    friends = models.ManyToManyField('self', null=True)