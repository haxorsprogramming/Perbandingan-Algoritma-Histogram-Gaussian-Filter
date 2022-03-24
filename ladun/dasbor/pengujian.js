// route 
var rToUploadVideo = server + "dashboard/pengujian/upload-video";
var rProsesPengujian = server + "dashboard/pengujian/proses-awal";
var rProsesPerbaikan = server + "dashboard/pengujian/proses-perbaikan";

var kdUjiGlobal = "";
var hashFile = "";
// vue object 
var divPengujian = new Vue({
    delimiters: ["[[", "]]"],
    el : '#divPengujian',
    data : {
        titleForm : 'Pengujian',
        videoField : false,
        kdPengujian : ''
    },
    methods : {
        mulaiAnalisaAwalAtc : function()
        {
            mulaiAnalisaAwal();
        },
        mulaiAnalisaPerbaikan : function()
        {
            let kdPengujian = divPengujian.kdPengujian;
            let ds = {'kdPengujian':kdPengujian}
            $("#divStatusUji2").show();
            $.post(rProsesPerbaikan, ds, function(data){
                console.log(data);
                let lokasiImgCitraAwal = server + "ladun/fileProses/citraAwal/"+kdPengujian+".png"
                let lokasiPicHisRgb = server + "ladun/fileProses/histogramAwalRgb/"+data.kode_pengujian+".png";
                let lokasiHasilPerbaikan = server + "ladun/fileProses/hasilMetode1/"+data.kode_pengujian+".png";
                let lokasiHasilHisPerbaikan = server + "ladun/fileProses/histogramMetode1/"+data.kode_pengujian+".png";

                let lokasiHasilMetode2 = server + "ladun/fileProses/hasilMetode2/"+data.kode_pengujian+".png";
                let lokasiHisMetode2 = server + "ladun/fileProses/histogramMetode2/"+data.kode_pengujian+".png";
                setTimeout(function(){
                    pesanUmumApp('success', 'Sukses', 'Berhasil melakukan perbaikan citra ...');
                    $("#divStatusUji2").hide();
                    document.querySelector("#imgPCitraAwal").setAttribute("src", lokasiImgCitraAwal);
                    document.querySelector("#imgPHisAwal").setAttribute("src", lokasiPicHisRgb);
                    document.querySelector("#imgPCitraPerbaikan").setAttribute("src", lokasiHasilPerbaikan);
                    document.querySelector("#imgPHisPerbaikan").setAttribute("src", lokasiHasilHisPerbaikan);

                    document.querySelector("#imgPCitraAwal2").setAttribute("src", lokasiImgCitraAwal);
                    document.querySelector("#imgPHisAwal2").setAttribute("src", lokasiPicHisRgb);

                    document.querySelector("#imgPCitraPerbaikan2").setAttribute("src", lokasiHasilMetode2);
                    document.querySelector("#imgPHisPerbaikan2").setAttribute("src", lokasiHisMetode2);
                    document.querySelector("#txtWaktuProses1").innerHTML = data.waktuProsesMetode1;
                    document.querySelector("#txtWaktuProses2").innerHTML = data.waktuProsesMetode2;
                $("#divHasilPerbaikan").show();
                }, 4000);
                
            });
        }
    }
});

// inisialisasi & fungsi
var statusPilihFoto = false;

function mulaiAnalisaAwal()
{
    if(statusPilihFoto === false){
        pesanUmumApp('warning', 'Pilih Citra', 'Harap pilih citra terlebih dahulu ...');
    }else{
        let dataPic = document.querySelector("#txtPreviewUpload").getAttribute("src");
        $("#divStatusUji").show();
        let ds = {'dataPic':dataPic}
        $.post(rProsesPengujian, ds, function(data){
            setTimeout(function(){
                console.log(data);
                let kdPengujian = data.kode_pengujian;
                divPengujian.kdPengujian = kdPengujian;
                pesanUmumApp('success', 'Sukses', 'Berhasil melakukan analisa awal citra ...');
                $("#divStatusUji").hide();
                let lokasiPicHisGrayscale = server + "ladun/fileProses/histogramAwal/"+data.kode_pengujian+".png";
                let lokasiPicHisRgb = server + "ladun/fileProses/histogramAwalRgb/"+data.kode_pengujian+".png";
                document.querySelector("#imgHisGrayscale").setAttribute("src", lokasiPicHisGrayscale);
                document.querySelector("#imgHisRgb").setAttribute("src", lokasiPicHisRgb);
                $("#divHasilAnalisaFotoAwal").show();
            }, 2000);
        });
    }
}

function mulaiAnalisaPerbaikan()
{
    divPengujian.mulaiAnalisaPerbaikan();
}

function getImg()
{
    var input = document.querySelector('#txtFotoInput');
    var imgPrev = document.querySelector('#txtPreviewUpload');
    var fileGambar = new FileReader();
    fileGambar.readAsDataURL(input.files[0]);
    fileGambar.onload = function(e){
        let hasil = e.target.result;
        imgPrev.src = hasil;
        statusPilihFoto = true;
    }

}

function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}