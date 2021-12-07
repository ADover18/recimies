from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.urls import path

from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('register', RegisterView.as_view(), name='register'),
    path('profile/<int:user_id>', ProfileView.as_view(), name='profile'),
    # path('edit_profile/<int:pk>', UserUpdate.as_view(), name='edit_profile'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('profile/<int:user_id>/new-recipe', NewRecipeView.as_view(), name='new_recipe'),
    path('<int:user_id>/recipe/<int:pk>/edit', RecipeUpdate.as_view(), name='edit_recipe'),
    path('recipe/<int:recipe_pk>', RecipeView.as_view(), name='recipe'),
    path('usersearch', SearchUsersListView.as_view(), name='usersearch'),
    path('recipes_endpoint', recipes_endpoint, name='recipes_endpoint'),
]

urlpatterns += staticfiles_urlpatterns()
