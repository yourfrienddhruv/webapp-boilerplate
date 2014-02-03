from django.core import serializers
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.decorators.csrf import ensure_csrf_cookie
from sharemycomments.utils import json_response
from sharemycomments.apps.comments.models import Comment
from sharemycomments.apps.comments.forms import AddCommentForm
import logging

logger = logging.getLogger(__name__)


@json_response
#@ensure_csrf_cookie
@login_required
#@user_passes_test(lambda u: u.is_staff)
def list_or_save_comments(request):
    if request.method == 'POST':
        return save_comment(request)
    elif request.method == 'GET':
        return get_user_comments(request)
    else:
        return {"status": 310, "error": "Wrong method"}


def get_user_comments(request):
    user = request.user
    logger.warn('User is %s'% user)
    userid=1
    usercomments = Comment.objects.filter(uid=userid)
    #logger.info("comments of user %s are" % (user.id ))
    dictionaries = [obj.get_json() for obj in usercomments]
    return {"usercomments": dictionaries}


def save_comment(request):
    logger.warn("comments request.POST %s" % request.POST)
    comment_form = AddCommentForm(request.POST, request)
    if comment_form.is_valid():
        try:
            my_comment = comment_form.to_db_object(uid=1)
            my_comment.save()
        except:
            return {"status": 501, "error": "true"}
        return {"success": "true"}
    else:
        return {"status": 501, "error": comment_form.errors}


@json_response
def delte_comment(request, id):
    try:
        c = Comment.objects.get(pk=id)
        c.is_deleted = True
        c.save()
    except:
        return {"status": 501, "error": "Unable to Delete Comment."}
    return {"success": "true"}


def show_test_page(request):
    return render(request, 'comments/test.html')