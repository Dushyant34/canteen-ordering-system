import imp
import re
import json
from unicodedata import name
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views import View
from .models import MenuItem, Category, OrderModel
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


# Create your views here.
class Home(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'users/homepage.html')

class Contact(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'users/contact_us.html')

class Login(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'users/login.html')

    def post(self, request, *args, **kwargs):
        username = request.POST['email']   
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # after completing the above lines of code it redirect the url to home page
                return redirect(reverse('users:home'))
        return render(request, 'users/register.html')    


class Register(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'users/register.html')

    def post(self, request, *args, **kwargs):
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['psw']

        user = User.objects.create_user(first_name=name,username=email,password=password)
        return redirect(reverse('users:home'))

class Order(View):
    def get(self, request, *args, **kwargs):
        # get every item from each category
        appetizers = MenuItem.objects.filter(category__name__contains="Appetizers")
        entres = MenuItem.objects.filter(category__name__contains='Pizza')
        desserts = MenuItem.objects.filter(category__name__contains='Burger')
        drinks = MenuItem.objects.filter(category__name__contains='Drink')

        # pass into context
        context = {
            'appetizers': appetizers,
            'entres': entres,
            'desserts': desserts,
            'drinks': drinks,
        } 

        # render the template
        return render(request, 'users/order.html', context)

    def post(self, request, *args, **kwargs):
        name = request.POST.get('name')
        email = request.POST.get('email')

        order_items = {
            'items': []
        }

        items = request.POST.getlist('items[]')

        for item in items:
            menu_item = MenuItem.objects.get(pk=int(item))
            item_data = {
                'id': menu_item.pk,
                'name': menu_item.name,
                'price': menu_item.price
            }

            order_items['items'].append(item_data)

            price = 0
            item_ids = []

        for item in order_items['items']:
            price += item['price']
            item_ids.append(item['id'])

        order = OrderModel.objects.create(
            price=price,
            name=name,
            email=email,
        )
        order.items.add(*item_ids)

        context = {
            'items': order_items['items'],
            'price': price
        }

        return redirect('users:order-confirmation', pk=order.pk)


class OrderConfirmation(View):
    def get(self, request, pk, *args, **kwargs):
        order = OrderModel.objects.get(pk=pk)

        context = {
            'pk': order.pk,
            'items': order.items,
            'price': order.price,
        }

        return render(request, 'users/order_confirmation.html', context)

    def post(self, request, pk, *args, **kwargs):
        data = json.loads(request.body)

        if data['isPaid']:
            order = OrderModel.objects.get(pk=pk)
            order.is_paid = True
            order.save()

        return redirect('users:payment-confirmation')


class OrderPayConfirmation(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'users/order_pay_confirmation.html')
