from django.contrib import admin
from .models import Direction, Ingredient, Recipe,  Profile

admin.site.register(Profile)

class IngredientInline(admin.TabularInline):
    model = Ingredient

class DirectionInline(admin.TabularInline):
    model = Direction



@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    inlines = [IngredientInline, DirectionInline, ]