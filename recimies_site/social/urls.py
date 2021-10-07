from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.urls import path

from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('register', RegisterView.as_view(), name='register'),
    path('profile/<int:user_pk>', ProfileView.as_view(), name='profile'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('profile/<int:user_pk>/new-recipie', NewRecipieView.as_view(), name='new_recipie'),
    path('recipie/<int:recipie_pk>', RecipieView.as_view(), name='recipie'),
    path('usersearch', SearchUsersListView.as_view(), name='usersearch'),
]

urlpatterns += staticfiles_urlpatterns()
