from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.urls import path

from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('register', RegisterView.as_view(), name='register'),
    path('profile/<int:user_pk>', ProfileView.as_view(), name='profile'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('profile/<int:user_pk>/new-recipe', NewRecipeView.as_view(), name='new_recipe'),
    path('recipe/<int:recipe_pk>', RecipeView.as_view(), name='recipe'),
    path('usersearch', SearchUsersListView.as_view(), name='usersearch'),
    path('recipes_endpoint', recipes_endpoint, name='recipes_endpoint')
]

urlpatterns += staticfiles_urlpatterns()
