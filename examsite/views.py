from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.urls import reverse

from .models import User

# Create your views here.
# Create your views here.
def index(request):
    """
        As a single page app, many links and routes will default to index.
        This will render the single html used, outside of the login and register pages.
    """
    return render(request, "examsite/index.html")


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "examsite/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "examsite/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect("/organizer")
    else:
        return render(request, "examsite/register.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect("/organizer")
        else:
            return render(request, "examsite/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "examsite/login.html")



def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))