from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("login", views.login_view, name="login"),

    # match all other pages, user by react router
    re_path(r'^$', views.index),
    re_path(r'^(?:.*)/?$', views.index)
]