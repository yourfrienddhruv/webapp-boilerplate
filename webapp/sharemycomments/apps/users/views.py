from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
import logging

from sharemycomments.utils import json_response


logger = logging.getLogger(__name__)


@json_response
#@ensure_csrf_cookie
#@login_required
#@user_passes_test(lambda u: u.is_staff)
def list_or_save_user(request):
    if request.method == 'POST':
        return save_user(request)
    elif request.method == 'GET':
        return get_users(request)
    else:
        return {"status": 310, "error": "Wrong method"}

def get_users(request):
    users = User.objects.all()
    dictionaries = [obj.username for obj in users]
    return {"users": dictionaries}


def save_user(request):
    form = UserCreationForm(request.POST, request)
    if form.is_valid():
        try:
            user = form.save()
            return {"username": user.username, "id": user.id}
        except:
            return {"status": 501, "error": "true"}
        return {"success": "true"}
    else:
        return {"status": 501, "error": form.errors}
