from django.forms import ModelForm, ValidationError
from django import forms
from django.contrib.auth.forms import UserCreationForm, UsernameField
from django.contrib.auth.models import User

from .models import Direction, Ingredient, Recipe, RecimieUser


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

class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        exclude = ()
        
IngredientFormSet = forms.inlineformset_factory(Recipe, Ingredient, fields=['ingredient', 'quantity', 'unit'], extra=1, can_delete=True)

class DirectionForm(forms.ModelForm):
    class Meta:
        model = Direction
        exclude = ()
        
DirectionFormSet = forms.inlineformset_factory(Recipe, Direction, fields=['direction'], extra=1, can_delete=True)


class RecipeForm(ModelForm):

    class Meta:
        model = Recipe
        exclude = ['user',]

    def __init__(self, *args, **kwargs):
        self.user = RecimieUser.objects.get(pk=kwargs.pop('user_pk', None))
        super(RecipeForm, self).__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        recipe = super(RecipeForm, self).save(commit=False)
        recipe.user = self.user
        recipe.save()
        return recipe