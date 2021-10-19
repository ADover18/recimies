from django.contrib import admin
from .models import MethodStep, Ingredient, Recipie, RecimieUser

# Register your models here.
admin.site.register(RecimieUser)

class IngredientInline(admin.TabularInline):
    model = Ingredient

class MethodInline(admin.TabularInline):
    model = MethodStep

@admin.register(Recipie)
class RecipeAdmin(admin.ModelAdmin):
    inlines = [IngredientInline, MethodInline, ]