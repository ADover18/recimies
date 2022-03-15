from .models import Recipe
from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth.models import User


def recipes_endpoint(request):
    recipes = Recipe.objects.all()

    if request.user.is_authenticated:
        curuser = User.objects.get(username=request.user.username)
        followingusers = curuser.profile.followers.all()
        following_ids = []
        for followinguser in followingusers.values():
            following_ids.append(followinguser["id"])

        following_recipes = Recipe.objects.filter(user__in=following_ids)

        other_recipes = Recipe.objects.exclude(user__in=following_ids)
        recipe_list = {
                'friends_recipes': serializers.serialize('json',following_recipes, use_natural_foreign_keys=True),
                'other_recipes': serializers.serialize('json',other_recipes, use_natural_foreign_keys=True),
                'recipes': serializers.serialize('json',recipes, use_natural_foreign_keys=True)
        }
        return JsonResponse(recipe_list)
    
    else:
        recipe_list = {
                'recipes': serializers.serialize('json',recipes, use_natural_foreign_keys=True)
        }
        return JsonResponse(recipe_list)