from django.shortcuts import render
from django.http import HttpResponse
from .models import product
# Create your views here.

def index(request):
    prods = product.objects.all().order_by('id')
    prods = prods[::-1][0:3]
    print(type(prods[0]))
    return render(request, 'index.html', {'prods' : prods})

def store(request):
    prods = product.objects.all().order_by('id')
    return render(request, 'store.html', {'prods' : prods})

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def cart(request):
    prods = product.objects.all()
    return render(request, 'cart.html', {'prods' : prods})

def email(request):
    return render(request, 'email.html')
