from unicodedata import name
from xml.dom.minidom import Document
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from users.views import Home, Contact, Login, Register, Order, OrderConfirmation, OrderPayConfirmation

app_name = "users"

urlpatterns = [
    path('', Home.as_view(), name = "home"),
    path('contact', Contact.as_view(), name='contact'),
    path('login', Login.as_view(), name='login' ),
    path('register', Register.as_view(), name='register'),
    path('order', Order.as_view(), name='order'),
    path('order-confirmation/<int:pk>', OrderConfirmation.as_view(),
         name='order-confirmation'),
    path('payment-confirmation/', OrderPayConfirmation.as_view(),
         name='payment-confirmation'),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
