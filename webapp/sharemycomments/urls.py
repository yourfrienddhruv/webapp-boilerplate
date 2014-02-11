from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'sharemycomments.views.home', name='home'),
                       # url(r'^sharemycomments/', include('sharemycomments.foo.urls')),

                       # Uncomment the admin/doc line below to enable admin documentation:
                       # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                       # Uncomment the next line to enable the admin:
                       url(r'^admin/', include(admin.site.urls)),
                       #url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
                       url(r'^users/', include("sharemycomments.apps.users.urls")),
                       url(r'^comments/', include("sharemycomments.apps.comments.urls")),
                       url(r'^fileupload/', include("sharemycomments.apps.fileupload.urls")),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
