from django.forms import ModelForm, ValidationError
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Recipie


class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

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
        self.user_pk = kwargs.pop('user_pk', None)
        super(RecipieForm, self).__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        recipie = super(RecipieForm, self).save(*args, **kwargs)
        recipie.user = User.objects.get(pk=self.user_pk)
        recipie.save()
        return recipie
        
        
