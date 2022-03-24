from django.db import models

# Create your models here.
class AuthSekolah(models.Model):
    kd_pengujian = models.CharField(max_length=50)
    nama_pengujian = models.CharField(max_length=205)
    nama_penguji = models.CharField(max_length=200)
    waktu_pengujian = models.CharField(max_length=200)
    durasi_algo_1 = models.CharField(max_length=10)
    durasi_algo_2 = models.CharField(max_length=10)

    class Meta:
        db_table = "tbl_pengujian"