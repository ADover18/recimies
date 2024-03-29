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
from .models import Profile, Recipe
from django.contrib.auth.mixins import UserPassesTestMixin



class IndexView(FormView):
    template_name = "index.html"
    success_url = reverse_lazy('index')
    form_class = AuthenticationForm
    

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super(IndexView, self).form_valid(form)

    

class ProfileView(DetailView):
    model = Profile
    template_name = 'profile.html'
    form_class = ProfileForm

    def get_success_url(self, **kwargs):
        user_id = self.kwargs['user_id']
        return redirect('profile', user_id = user_id)

    def get_form(self):
        form = self.form_class(instance=self.get_object())
        return form

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)
        followers = Profile.objects.filter(followers=self.object.pk)
        context['followers'] = followers
        context['form'] = self.get_form()
        return context

    def get_object(self, **kwargs):
        user_id = self.kwargs['user_id']
        object = User.objects.get(id=user_id).profile
        return object

    def post(self, request, **kwargs):
        self.object = self.get_object()
        form = ProfileForm(request.POST,request.FILES, instance=request.user.profile)
        
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)
        

    def form_valid(self, form):
        form.save()
        return self.get_success_url()

    def form_invalid(self, form):
        return self.render_to_response(self.get_context_data(form=self.get_form()))
    

class RegisterView(CreateView):
    template_name = "register.html"
    model = User
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

        context['ingredients'] = ingredients
        context['direction'] = direction
        
        return context

    def get_object(self, **kwargs):
        object = Recipe.objects.get(pk=self.kwargs['recipe_pk'])
        return object



class NewRecipeView(UserPassesTestMixin, CreateView):
    model = Recipe 
    template_name = "recipe_form.html"
    form_class = RecipeForm
    success_url = reverse_lazy('index')
    
    def test_func(self):
        url = self.request.build_absolute_uri()
        url_root = self.request.build_absolute_uri('/')
        user_id = User.objects.get(username=self.request.user.username).id
        return url[len(url_root)+8:url.index("new-recipe")-1] == str(user_id)
        
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
        print(self.kwargs)
        return HttpResponseRedirect(self.get_success_url())

    def form_invalid(self, form, ingredient_form, direction_form):
        a = self.get_context_data(form=form, ingredient_form = ingredient_form, direction_form=direction_form)
        return self.render_to_response(
            self.get_context_data(form=form, ingredient_form = ingredient_form, direction_form=direction_form)
        )

    def get_form_kwargs(self):
        kwargs = super(NewRecipeView, self).get_form_kwargs()
        kwargs['user_id'] = self.kwargs['user_id']
        return kwargs
    

class RecipeUpdate(UserPassesTestMixin, UpdateView):
    model = Recipe 
    template_name = "recipe_form.html"
    form_class = RecipeForm
    success_url = reverse_lazy('index')

    def test_func(self):
        return self.get_object().user.username == self.request.user.username


    def get(self, request, *args, **kwargs):
        """
        Handles GET requests and instantiates filled versions of the form
        and its inline formsets.
        """
        self.object = self.get_object()
        form_class = self.get_form_class()
        ingredient_form_class = IngredientFormSet
        direction_form_class = DirectionFormSet
        form = self.get_form(form_class)
        # del self.kwargs['user_pk']
        ingredient_form = IngredientFormSet(instance = self.object)
        direction_form = DirectionFormSet(instance = self.object)
        # a = ingredient_form.__dict__
        # DIE
        return self.render_to_response(
            self.get_context_data(form=form, ingredient_form=ingredient_form, direction_form=direction_form)
        )

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance and its inline
        formsets with the passed POST variables and then checking them for
        validity.
        """
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        ingredient_form = IngredientFormSet(self.request.POST, instance=self.object)
        direction_form = DirectionFormSet(self.request.POST, instance=self.object)
        form.user = form.instance.user
        if (form.is_valid() and ingredient_form.is_valid() and direction_form.is_valid()):
            return self.form_valid(form, ingredient_form, direction_form)
        else:
            del kwargs['user_id']
            del kwargs['pk']
            return self.form_invalid(form, ingredient_form, direction_form)

    def form_valid(self, form, ingredient_form, direction_form):
        self.object = form.save()
        ingredient_form.instance = self.object
        ingredient_form.save()
        direction_form.instance = self.object
        direction_form.save()
        print(self.kwargs)
        return HttpResponseRedirect(self.get_success_url())


    def form_invalid(self, form, ingredient_form, direction_form):
        a = {'direction_form': direction_form,
            'form': form,
            'ingredient_form': ingredient_form,
            'view': self}
        
        return self.render_to_response(
            self.get_context_data(form=form, ingredient_form = ingredient_form, direction_form=direction_form)
        )


class SearchUsersListView(ListView):
    model = User
    template_name = "search_for_users.html"


    def get_context_data(self, **kwargs):
        context = super(SearchUsersListView, self).get_context_data(**kwargs)
        curuser = User.objects.get(username=self.request.user.username)
        context['following'] = User.objects.filter(id__in=[f.id for f in curuser.profile.followers.all()])
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
        curuser = User.objects.get(username=self.request.user.username)
        if 'addfollow' in params.keys():
            usertoadd = User.objects.get(id=params['addfollow'])
            curuser.profile.followers.add(usertoadd)
            curuser.save()
        elif 'removefollow' in params.keys():
            usertoremove = User.objects.get(id=params['removefollow'])
            curuser.profile.followers.remove(usertoremove)
            curuser.save()
        else:
            pass
        return redirect('usersearch')        
            