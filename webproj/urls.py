from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name = 'index'),
    path('store/', views.store, name = 'store'),
    path('about', views.about, name = "about"),
    path('contact', views.contact, name = "contact"),
    path('cart/', views.cart, name = 'cart'),
    path('mail/', views.email, name='email')
]