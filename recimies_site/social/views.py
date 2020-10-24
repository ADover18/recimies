from django.conf import settings
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic.base import RedirectView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, FormView
from django.views.generic.list import ListView
from django.utils.decorators import method_decorator

from .forms import RecipieForm, RegisterForm
from .models import Recipie


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
    model = User
    template_name = 'profile.html'

    def get_object(self, **kwargs):
        user_pk = self.kwargs['user_pk']
        object = User.objects.get(pk=user_pk)
        return object


class RegisterView(CreateView):
    template_name = "register.html"
    model = User
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
    
    def get_object(self, **kwargs):
        object = Recipie.objects.get(pk=self.kwargs['recipie_pk'])
        return object


class NewRecipieView(CreateView):
    model = Recipie 
    template_name = "recipie_form.html"
    form_class = RecipieForm
    success_url = '/'
    
    def get_form_kwargs(self):
        kwargs = super(NewRecipieView, self).get_form_kwargs()
        kwargs['user_pk'] = self.kwargs['user_pk']
        return kwargs

    def form_valid(self, form):
        return super().form_valid(form)
