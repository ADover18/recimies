from django.conf import settings
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect

from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic.base import RedirectView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, FormView, UpdateView
from django.views.generic.list import ListView
from django.utils.decorators import method_decorator
from django.db import transaction
from django.urls import reverse_lazy

from .forms import *
from .models import Recipie, RecimieUser


class IndexView(FormView):
    template_name = "index.html"
    success_url = '/'
    form_class = AuthenticationForm

    @method_decorator(sensitive_post_parameters('password'))
    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        # Sets a test cookie to make sure the user has cookies enabled
        request.session.set_test_cookie()

        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        auth_login(self.request, form.get_user())

        # If the test cookie worked, go ahead and
        # delete it since its no longer needed
        if self.request.session.test_cookie_worked():
            self.request.session.delete_test_cookie()

        return super(IndexView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['recipies'] = Recipie.objects.all()
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
    success_url = '/'


class LogoutView(RedirectView):
    url = '/'

    def get(self, request, *args, **kwargs):
        auth_logout(request)
        return super(LogoutView, self).get(request, *args, **kwargs)


class RecipieView(DetailView):
    model = Recipie
    template_name = "recipie.html"

    def get_context_data(self, **kwargs):
        context = super(RecipieView, self).get_context_data(**kwargs)
        ingredients = Ingredient.objects.filter(recipe=self.object.pk)
        method = MethodStep.objects.filter(recipe=self.object.pk)
        context['ingredients'] = ingredients
        context['method'] = method
        return context

    
    
    def get_object(self, **kwargs):
        object = Recipie.objects.get(pk=self.kwargs['recipie_pk'])
        return object




class NewRecipieView(CreateView):
    model = Recipie 
    template_name = "recipie_form.html"
    form_class = RecipieForm
    success_url = '/'

    def get_context_data(self, **kwargs):
        data = super(NewRecipieView, self).get_context_data(**kwargs)
        if self.request.POST:
            data['ingredients'] = IngredientFormSet(self.request.POST)
            data['method'] = MethodFormSet(self.request.POST)
        else:
            data['ingredients'] = IngredientFormSet()
            data['method'] = MethodFormSet()
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        ingredients = context['ingredients']
        method = context['method']
        with transaction.atomic():
            form.instance.user = self.request.user
            self.object = form.save()
            if ingredients.is_valid():
                ingredients.instance = self.object
                ingredients.save()
            if method.is_valid():
                method.instance = self.object
                method.save()
        return super(NewRecipieView, self).form_valid(form)


    def get_form_kwargs(self):
        kwargs = super(NewRecipieView, self).get_form_kwargs()
        kwargs['user_pk'] = self.kwargs['user_pk']
        return kwargs

    # def form_valid(self, form):
    #     return super().form_valid(form)
    

class RecipieUpdate(UpdateView):
    model = Recipie 
    template_name = "recipie_form.html"
    form_class = RecipieForm

    def get_context_data(self, **kwargs):
        data = super(RecipieUpdate, self).get_context_data(**kwargs)
        if self.request.POST:
            data['ingredients'] = IngredientFormSet(self.request.POST)
            data['method'] = MethodFormSet(self.request.POST)
        else:
            data['ingredients'] = IngredientFormSet()
            data['method'] = MethodFormSet()
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        ingredients = context['ingredients']
        method = context['method']
        with transaction.atomic():
            form.instance.user = self.request.user
            self.object = form.save()
            if ingredients.is_valid():
                ingredients.instance = self.object
                ingredients.save()
            if method.is_valid():
                method.instance = self.object
                method.save()
        return super(RecipieUpdate, self).form_valid(form)


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