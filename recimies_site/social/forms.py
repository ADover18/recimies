from django.forms import ModelForm, ValidationError
from django import forms
from django.contrib.auth.forms import UserCreationForm, UsernameField

from .models import Direction, Ingredient, Recipe, RecimieUser
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout
from crispy_forms.bootstrap import Div

class RegisterForm(UserCreationForm):
    
    class Meta:
        model = RecimieUser
        fields = ['username', 'email', 'password1', 'password2']
        field_classes = {'username': UsernameField}

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        if RecimieUser.objects.filter(email=email).count() > 0:
            raise ValidationError(
                "A user with this email already exists"
            )
        username = cleaned_data.get('username')
        if RecimieUser.objects.filter(username=username).count() > 0:
            raise ValidationError(
                "A user with this username already exists"
            )

class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = ['ingredient', 'quantity', 'unit']

    # def __init__(self, *args, **kwargs):
    #     self.fields = ['ingredient', 'quantity', 'unit']
    #     self.helper = FormHelper(self)
    #     self.helper.render_hidden_fields = True

        
IngredientFormSet = forms.inlineformset_factory(Recipe, Ingredient, form=IngredientForm, extra=1, can_delete=True)

class DirectionForm(forms.ModelForm):
    class Meta:
        model = Direction
        fields = ['direction']

    def __init__(self, *args, **kwargs):
        super(DirectionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_show_labels = False

        
DirectionFormSet = forms.inlineformset_factory(Recipe, Direction, form=DirectionForm, extra=1, can_delete=True)



class RecipeForm(ModelForm):
    
    class Meta:
        model = Recipe
        exclude = ['user',]
        error_messages = {
            'name': {
                'required': "Please enter a recipe name.",
            },
        }
        

    def __init__(self, *args, **kwargs):
        if "instance" in kwargs and kwargs["instance"] == None:
                self.user = RecimieUser.objects.get(pk=kwargs.pop('user_pk', None))
        super(RecipeForm, self).__init__(*args, **kwargs)
        self.fields['name'].label = "Recipe name"
        self.fields['serves'].label = "Serves/Makes"
        self.fields['prep_time'].label = "Preparation time"
        # self.fields['prep_time_units'].label = "..."
        self.helper = FormHelper(self)
        self.helper.render_hidden_fields = True
        self.helper.layout = Layout(
            Div(
                Div('name', css_class="col-10"), 
                Div('serves', css_class="col-2"), css_class="form-row"
            ),
            Div(
                Div('cooking_time', css_class="col-6"),
                Div('cooking_time_units', css_class="col-6"),
                css_class="form-row"   
            ),
            Div(
                Div('prep_time', css_class="col-6"),
                Div('prep_time_units', css_class="col-6"),
                css_class='form-row'   
            ),
            Div('image',),
        )

    def save(self, *args, **kwargs):
        recipe = super(RecipeForm, self).save(commit=False)
        recipe.user = self.user
        recipe.save()
        return recipe