from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.files.base import ContentFile
from django.utils.crypto import get_random_string
import base64
from sympy import content
import uuid
import datetime
import cv2
from matplotlib import pyplot as plt
from skimage import io
from PIL import Image, ImageEnhance
import time
# Create your views here.

developer = "Andry Wiranda Hakiki"
judul = "Analisis Perbandingan Algoritma untuk Perbaikan Kualitas Citra"

def homePage(request):
    context = {
        'judul' : judul,
        'developer' : developer
    }
    return render(request, 'home.html', context)

def loginPage(request):
    context = {
        'judul' : judul,
        'developer' : developer
    }
    return render(request, 'login.html', context)

@csrf_exempt
def loginProses(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    if username == 'admin' and password == 'admin':
        status = 'sukses'
    else:
        status = 'gagal'

    context = {
        'username' : username,
        'status' : status
    }
    return JsonResponse(context, safe=False)

def dashboardPage(request):
    context = {
        'judul' : judul,
        'developer' : developer
    }
    return render(request, 'dashboard.html', context)

def beranda(request):
    context = {}
    return render(request, 'beranda.html', context)

def pengujian(request):
    context = {}
    return render(request, 'pengujian.html', context)

@csrf_exempt
def prosesAwal(request):
    kdPengujian = uuid.uuid4()
    dataImg = request.POST.get("dataPic")
    format, imgstr = dataImg.split(";base64,")
    dataDecode = ContentFile(base64.b64decode(imgstr))
    nama_gambar = str(kdPengujian)+".png"
    now = datetime.datetime.now()
    with open("ladun/fileProses/citraAwal/" + nama_gambar, "wb+") as f:
        for chunk in dataDecode.chunks():
            f.write(chunk)
    
    imgAwal = cv2.imread("ladun/fileProses/citraAwal/"+nama_gambar,0)
    # create histogram grayscale 
    histr = cv2.calcHist([imgAwal],[0],None,[100],[0,100])
    plt.plot(histr)
    plt.savefig("ladun/fileProses/histogramAwal/"+nama_gambar)
    plt.close()
    # create histogram rgb 
    plt.hist(imgAwal.ravel(), bins = 256)
    plt.savefig("ladun/fileProses/histogramAwalRgb/"+nama_gambar)
    context = {
        'status' : 'sukses',
        'kode_pengujian' : kdPengujian
    }
    return JsonResponse(context, safe=False)

@csrf_exempt
def prosesPerbaikan(request):
    kdPengujian = request.POST.get("kdPengujian")
    nama_gambar = str(kdPengujian)+".png"
    im = Image.open("ladun/fileProses/citraAwal/"+nama_gambar)
    startImg1 = time.time()
    enhancer = ImageEnhance.Brightness(im)
    factor = 1.5 #brightens the image
    im_output = enhancer.enhance(factor)
    im_output.save("ladun/fileProses/hasilMetode1/"+nama_gambar)
    endImg1 = time.time()
    waktuProses1 = endImg1 - startImg1
    # perbaikan metode 2 
    startImg2 = time.time()
    faktor2 = 1
    im_keluar2 = enhancer.enhance(factor)
    im_keluar2.save("ladun/fileProses/hasilMetode2/"+nama_gambar)
    endImg2 = time.time()
    waktuProses2 = endImg2 - startImg2
    # cari histogram hasi 
    imgHasilMetode1 = cv2.imread("ladun/fileProses/hasilMetode1/"+nama_gambar)
    plt.hist(imgHasilMetode1.ravel(), bins = 256)
    plt.savefig("ladun/fileProses/histogramMetode1/"+nama_gambar)

    imgHasilMetode2 = cv2.imread("ladun/fileProses/hasilMetode2/"+nama_gambar)
    plt.hist(imgHasilMetode2.ravel(), bins = 256)
    plt.savefig("ladun/fileProses/histogramMetode2/"+nama_gambar)

    context = {
        'status' : 'sukses',
        'kode_pengujian' : kdPengujian,
        'waktuProsesMetode1' : waktuProses1,
        'waktuProsesMetode2' : waktuProses2
    }
    return JsonResponse(context, safe=False)