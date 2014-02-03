from django.conf.urls import patterns, url

from sharemycomments.apps.users import views


urlpatterns = patterns('sharemycomments.apps.users.views',
                       url(r'^$', views.list_or_save_user),
                       url(r'^info/$', views.get_user_details),
                       url(r'^login/(?P<username>\w+)/$', views.login_user),
)