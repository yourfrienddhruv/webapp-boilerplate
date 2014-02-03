from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
import logging

from sharemycomments.utils import json_response


logger = logging.getLogger(__name__)


@json_response
#@ensure_csrf_cookie
#@user_passes_test(lambda u: u.is_staff)
def list_or_save_user(request):
    if request.method == 'POST':
        return save_user(request)
    elif request.method == 'GET':
        return get_users(request)
    else:
        return {"status": 310, "error": "Wrong method"}

@login_required
@json_response
def get_user_details(request):
    user = request.user
    return {"username": user.username}



@login_required
def get_users(request):
    users = User.objects.all()
    dictionaries = [obj.username for obj in users]
    return {"users": dictionaries}


@json_response
def login_user(request, username):
    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    #form = AuthenticationForm(request.POST,request)
    #form.clean()
    #user = authenticate(user.username,user.password)
    if user is not None:
        try:
            # the password verified for the user
            if user.is_active:
                logger.warn("User is valid, active and authenticated")
                login(request,user)
                return {"username": user.username, "id": user.id}
            else:
                logger.warn("The password is valid, but the account has been disabled!")
        except:
            return {"status": 501, "error": "true"}
    else:
        # the authentication system was unable to verify the username and password
        logger.warn("The username and password were incorrect.")
        return {"error": "true"}


def save_user(request):
    form = UserCreationForm(request.POST, request)
    if form.is_valid():
        try:
            user = form.save()
            user = authenticate(username=user.username, password=form.clean_password2())
            login(request,user)
            return {"username": user.username, "id": user.id}
        except Exception, e:
            logger.exception(e);
        return {"success": "true"}
    else:
        return {"status": 501, "error": form.errors}
