from django.contrib import admin
from .models import Direction, Ingredient, Recipe, RecimieUser

# Register your models here.
admin.site.register(RecimieUser)

class IngredientInline(admin.TabularInline):
    model = Ingredient

class DirectionInline(admin.TabularInline):
    model = Direction

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    inlines = [IngredientInline, DirectionInline, ]