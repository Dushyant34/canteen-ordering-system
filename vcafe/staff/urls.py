from django.urls import path, include
from staff.views import Dashboard,OrderDetails

app_name = "staff"

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('dashboard/', Dashboard.as_view(), name='dashboard'),
    path('orders/<int:pk>/', OrderDetails.as_view(), name='order-details'),
]
