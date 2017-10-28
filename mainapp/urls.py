from django.conf.urls import include, url
from mainapp import views

urlpatterns = [
    url(r'^$', views.treememo, name='treememo'),
]
