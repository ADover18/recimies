from django.forms import ModelForm, ValidationError
from django.contrib.auth.forms import UserCreationForm, UsernameField
from django.contrib.auth.models import User

from .models import Recipie, RecimieUser


class RegisterForm(UserCreationForm):
    class Meta:
        model = RecimieUser
        fields = ['username', 'email', 'password1', 'password2']
        field_classes = {'username': UsernameField}

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        if User.objects.filter(email=email).count() > 0:
            raise ValidationError(
                "A user with this email already exists"
            )
        username = cleaned_data.get('username')
        if User.objects.filter(username=username).count() > 0:
            raise ValidationError(
                "A user with this username already exists"
            )


class RecipieForm(ModelForm):
    class Meta:
        model = Recipie
        exclude = ['user']

    def __init__(self, *args, **kwargs):
        self.user = RecimieUser.objects.get(pk=kwargs.pop('user_pk', None))
        super(RecipieForm, self).__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        recipie = super(RecipieForm, self).save(commit=False)
        recipie.user = self.user
        recipie.save()
        return recipie
