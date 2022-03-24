from django.contrib import admin
from django.urls import path
from pip import main

from mainApp import views as mainApp

urlpatterns = [
    path('', mainApp.homePage),
    path('login/', mainApp.loginPage),
    path('login/proses', mainApp.loginProses),
    path('dashboard/', mainApp.dashboardPage),
    path('dashboard/beranda', mainApp.beranda),
    path('dashboard/pengujian', mainApp.pengujian),
    path('dashboard/pengujian/proses-awal', mainApp.prosesAwal),
    path('dashboard/pengujian/proses-perbaikan', mainApp.prosesPerbaikan)
]
