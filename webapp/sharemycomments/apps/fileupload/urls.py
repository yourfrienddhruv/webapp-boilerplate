from django.conf.urls import patterns, url
from sharemycomments.apps.fileupload import views


urlpatterns = patterns('sharemycomments.apps.fileupload.views',
                       url(r'^upload/', views.upload_file),

)