from django.forms import ModelForm, ValidationError
from django import forms
from django.contrib.auth.forms import UserCreationForm, UsernameField
from django.contrib.auth.models import User

from .models import MethodStep, Ingredient, Recipie, RecimieUser


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
        
IngredientFormSet = forms.inlineformset_factory(Recipie, Ingredient, fields=['ingredient', 'quantity', 'unit'], extra=3, can_delete=True)

class MethodForm(forms.ModelForm):
    class Meta:
        model = MethodStep
        exclude = ()
        
MethodFormSet = forms.inlineformset_factory(Recipie, MethodStep, fields=['step'], extra=3, can_delete=True)


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







# #Added


# class RecipeForm(forms.ModelForm):
#     class Meta:
#         exclude = ['user']

#     name = forms.CharField(required=True,max_length=255, null=False)
#     ingredients = forms.TextField(null=False, default='', required=True)
#     method = forms.TextField(null=False, default='')
#     image = forms.ImageField(upload_to=_recipie_image_path, default=settings.DEFAULT_IMAGE_PATH, required=True)
#     cooking_time = forms.IntegerField(default=0, required=True)
#     cooking_time_units = forms.CharField(max_length=20, default='', required=True)
#     prep_time = forms.IntegerField(null=False, default=0, required=True)
#     prep_time_units = forms.CharField(max_length=20, default='', required=True)
#     serves = forms.IntegerField(null=False, default=0, required=True)
#     equipment = forms.TextField(blank=True, required=True)

#     def __init__(self, *args, **kwargs):
#         self.user = RecimieUser.objects.get(pk=kwargs.pop('user_pk', None))
#         super().__init__(self, *args, **kwargs)
#         extra_infos = RecipeExtraInfo.objects.filter(recipe=self.instance)
#         for i in range(len(extra_infos) + 1):
#             field_name = 'extra_info_%s' % (i,)
#             self.fields[field_name] = forms.CharField(required=False)
#             try:
#                 self.initial[field_name] = extra_infos[i].extra_info
#             except IndexError:
#                 self.initial[field_name] = ""
#             #create an extra blank field
#             field_name = 'extra_info_%s' % (i + 1,)
#             self.fields[field_name] = forms.CharField(required=False)

#     def clean(self):
#         extra_infos = set()
#         i = 0
#         field_name = 'extra_info_%s' % (i,)
#         while self.cleaned_data.get(field_name):
#             extra_info = self.cleaned_data[field_name]
#             if extra_info in extra_infos:
#                 self.add_error(field_name, 'Duplicate')
#             else:
#                 extra_infos.add(extra_info)
#             i+=1
#             field_name = 'extra_info_%s' % (i,)
#         self.cleaned_data["extra_infos"] = extra_infos

#     def save(self):
#         recipie = self.instance
#         Recipie.name = self.cleaned_data["name"]
#         Recipie.user = self.cleaned_data["user"]
#         Recipie.ingredients = self.cleaned_data["ingredients"]
#         Recipie.method = self.cleaned_data["method"]
#         Recipie.image = self.cleaned_data["image"]
#         Recipie.cooking_time = self.cleaned_data["cooking_time"]
#         Recipie.cooking_time_units = self.cleaned_data["cooking_time_units"]
#         Recipie.prep_time = self.cleaned_data["prep_time"]
#         Recipie.prep_time_units = self.cleaned_data["prep_time_units"]
#         Recipie.serves = self.cleaned_data["serves"]
#         Recipie.cooking_time_units = self.cleaned_data["cooking_time_units"]
#         Recipie.equipment = self.cleaned_data["equipment"]

#         recipie.extra_info_set.all().delete()
#         for extra_info in self.cleaned_data["extra_infos"]:
#         RecipeExtraInfo.objects.create(
#                recipie=recipie,
#                extra_info=extra_info,
#            )

#     def get_extra_info_fields(self):
#         for field_name in self.fields:
#             if field_name.startswith("extra_info_"):
#                 yield self[field_name]

