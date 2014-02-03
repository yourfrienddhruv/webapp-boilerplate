from django.conf.urls import patterns, url

from sharemycomments.apps.comments import views


urlpatterns = patterns('sharemycomments.apps.comments.views',
                       url(r'^(?P<id>\d+)/$', views.delte_comment),
                       url(r'^csrf/$', views.show_test_page),
                       url(r'^$', views.list_or_save_comments),

)