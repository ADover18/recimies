from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.http.response import HttpResponseRedirect
from django.shortcuts import redirect

from django.views.generic.base import RedirectView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, FormView, UpdateView
from django.views.generic.list import ListView
from django.urls import reverse_lazy

from .forms import *
from .models import Recipe, RecimieUser


class IndexView(FormView):
    template_name = "index.html"
    success_url = reverse_lazy('index')
    form_class = AuthenticationForm
    #paginate_by = 8

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super(IndexView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        params = self.request.GET
        query = params.get('q')
        if query:
             recipes = Recipe.objects.filter(name__icontains=query)
        else:
             recipes = Recipe.objects.all()
        context['recipes'] = recipes
        return context


class ProfileView(DetailView):
    model = RecimieUser
    template_name = 'profile.html'

    def get_object(self, **kwargs):
        user_pk = self.kwargs['user_pk']
        object = RecimieUser.objects.get(pk=user_pk)
        return object


class RegisterView(CreateView):
    template_name = "register.html"
    model = RecimieUser
    form_class = RegisterForm
    success_url = reverse_lazy('index')


class LogoutView(RedirectView):
    url = reverse_lazy('index')

    def get(self, request, *args, **kwargs):
        logout(request)
        return super(LogoutView, self).get(request, *args, **kwargs)


class RecipeView(DetailView):
    model = Recipe
    template_name = "recipe.html"

    def get_context_data(self, **kwargs):
        context = super(RecipeView, self).get_context_data(**kwargs)
        ingredients = Ingredient.objects.filter(recipe=self.object.pk)
        direction = Direction.objects.filter(recipe=self.object.pk)
        if len(ingredients)< 18:
            offset = int(len(ingredients) / 2)
            if len(ingredients) % 2 != 0:
                offset +=1
            context['ingredients_col0'] = ingredients[:offset]
            context['ingredients_col1'] = ingredients[offset:]
        else:
             offset = int(len(ingredients) / 3)
             if len(ingredients) % 3 != 0:
                offset +=1
             context['ingredients_col0'] = ingredients[:offset]
             context['ingredients_col1'] = ingredients[offset:offset*2]
             context['ingredients_col2'] = ingredients[offset*2:]

        context['ingredients'] = ingredients
        context['direction'] = direction
        return context

    def get_object(self, **kwargs):
        object = Recipe.objects.get(pk=self.kwargs['recipe_pk'])
        return object


class EditRecipeMixin():
    def form_invalid(self, form, ingredient_form, direction_form):
        return self.render_to_response(
            self.get_context_data(form=form, ingredient_form = ingredient_form, direction_form=direction_form)
        )


class NewRecipeView(CreateView):
    model = Recipe 
    template_name = "recipe_form.html"
    form_class = RecipeForm
    success_url = reverse_lazy('profile')

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests and instantiates blank versions of the form
        and its inline formsets.
        """
        self.object = None
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        ingredient_form = IngredientFormSet()
        direction_form = DirectionFormSet()
        return self.render_to_response(
            self.get_context_data(form=form, ingredient_form=ingredient_form, direction_form=direction_form)
        )

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance and its inline
        formsets with the passed POST variables and then checking them for
        validity.
        """
        self.object = None
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        ingredient_form = IngredientFormSet(self.request.POST)
        direction_form = DirectionFormSet(self.request.POST)
        if (form.is_valid() and ingredient_form.is_valid() and direction_form.is_valid()):
            return self.form_valid(form, ingredient_form, direction_form)
        else:
            return self.form_invalid(form, ingredient_form, direction_form)

    def form_valid(self, form, ingredient_form, direction_form):
        self.object = form.save()
        ingredient_form.instance = self.object
        ingredient_form.save()
        direction_form.instance = self.object
        direction_form.save()
        return HttpResponseRedirect(self.get_success_url())

    def form_invalid(self, form, ingredient_form, direction_form):
        return self.render_to_response(
            self.get_context_data(form=form, ingredient_form = ingredient_form, direction_form=direction_form)
        )

    def get_form_kwargs(self):
        kwargs = super(NewRecipeView, self).get_form_kwargs()
        kwargs['user_pk'] = self.kwargs['user_pk']
        return kwargs
    

class RecipeUpdate(UpdateView, EditRecipeMixin):
    model = Recipe 
    template_name = "recipe_form.html"
    form_class = RecipeForm
    success_url = reverse_lazy('profile')

    def get_form_kwargs(self):
        kwargs = super(NewRecipeView, self).get_form_kwargs()
        kwargs['user_pk'] = self.kwargs['user_pk']
        kwargs['recipe_pk'] = self.kwargs['recipe_pk'] # whatever the url var is called
        return kwargs

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance and its inline
        formsets with the passed POST variables and then checking them for
        validity.
        """
        # self.object is already set up UpdateView
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        ingredient_form = IngredientFormSet(self.request.POST)
        direction_form = DirectionFormSet(self.request.POST)
        if (form.is_valid() and ingredient_form.is_valid() and direction_form.is_valid()):
            return self.form_valid(form, ingredient_form, direction_form)
        else:
            return self.form_invalid(form, ingredient_form, direction_form)

    def form_valid(self, form, ingredient_form, direction_form):
        pass
        """
        look at contents in form and update the objects that are
        being edited
        then save them with their new contents
        """
        
        # self.object = form.save()
        # ingredient_form.instance = self.object
        # ingredient_form.save()
        # direction_form.instance = self.object
        # direction_form.save()
        # return HttpResponseRedirect(self.get_success_url())

#     model = Recipe 
#     template_name = "recipe_form.html"
#     form_class = RecipeForm

#     def get_context_data(self, **kwargs):
#         data = super(RecipeUpdate, self).get_context_data(**kwargs)
#         if self.request.POST:
#             data['ingredients'] = IngredientFormSet(self.request.POST)
#             data['direction'] = DirectionFormSet(self.request.POST)
#         else:
#             data['ingredients'] = IngredientFormSet()
#             data['direction'] = DirectionFormSet()
#         return data

#     def form_valid(self, form):
#         context = self.get_context_data()
#         ingredients = context['ingredients']
#         direction = context['direction']
#         with transaction.atomic():
#             form.instance.user = self.request.user
#             self.object = form.save()
#             if ingredients.is_valid():
#                 ingredients.instance = self.object
#                 ingredients.save()
#             if direction.is_valid():
#                 direction.instance = self.object
#                 direction.save()
#         return super(RecipeUpdate, self).form_valid(form)


class SearchUsersListView(ListView):
    model = RecimieUser
    template_name = "search_for_users.html"


    def get_context_data(self, **kwargs):
        context = super(SearchUsersListView, self).get_context_data(**kwargs)
        curuser = RecimieUser.objects.get(username=self.request.user.username)
        context['friends'] = RecimieUser.objects.filter(pk__in=[f.pk for f in curuser.friends.all()])
        return context

    

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.GET
        query = params.get('q')
        if query:
            return qs.filter(username__icontains=query)
        else:
            return qs

    def post(self, request):
        params = self.request.POST
        curuser = RecimieUser.objects.get(username=self.request.user.username)
        if 'addfriend' in params.keys():
            friendtoadd = RecimieUser.objects.get(pk=params['addfriend'])
            curuser.friends.add(friendtoadd)
            curuser.save()
        elif 'removefriend' in params.keys():
            friendtoremove = RecimieUser.objects.get(pk=params['removefriend'])
            curuser.friends.remove(friendtoremove)
            curuser.save()
        else:
            pass
        return redirect('usersearch')        
            
    #if two users are friends in the database render the text following else render a follow button