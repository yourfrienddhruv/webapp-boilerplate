from django.conf.urls import patterns, url
from sharemycomments.apps.fileupload import views


urlpatterns = patterns('sharemycomments.apps.fileupload.views',
                       url(r'^upload/', views.upload_file),
                       url(r'^submit/', views.submit_form),
                       url(r'^getJSON/', views.getJSON),


)