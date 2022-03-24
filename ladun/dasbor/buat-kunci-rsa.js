// Route 
var rToCreateKey = server + "dashboard/proses-kunci-baru";
var rToHapusKunci = server + "dashboard/proses-hapus-kunci";

// Vue object 
var divMitra = new Vue({
    el : '#divMitra',
    data : {

    },
    methods : {
        buatKunciBaruAtc : function()
        {
          $("#dFormBuatKunci").show();
          document.querySelector("#txtTeks").focus();
            // pesanUmumApp('success', 'Sukses', 'Berhasil membuat kunci baru ... ');
            // $.post(rToCreateKey, function(data){
            //     divMain.titleApps = "Buat Kunci RSA";
            //     renderMenu("dashboard/buat-kunci-rsa");
            // });
        },
        hapusKunciAtc : function(id)
        {
          // console.log(namaKunci);
            hapusKunci(id);
        },
        tutupFormAtc : function()
        {
          $("#dFormBuatKunci").hide();
        },
        prosesAtc : function(prosesAtc)
        {
          let teks = document.querySelector("#txtTeks").value;
          let kunci = document.querySelector("#txtKunci").value;
          let kunci2 = document.querySelector("#txtKunci2").value;
          let ds = {'teks':teks, 'kunci':kunci, 'kunci2':kunci2}
          console.log(ds);
          pesanUmumApp('warning', 'Not prime number', 'Kunci yang dimasukkan bukan bilangan prima');
          // $.post(rToCreateKey, ds, function(data){
          //   let status = data.status;
          //   if(status === 'not_prime_number'){
          //     pesanUmumApp('warning', 'Not prime number', 'Kunci yang dimasukkan bukan bilangan prima');
          //   }else if(status === 'double_kunci'){
          //     pesanUmumApp('warning', 'Double record', 'Nama kunci sudah di gunakan');
          //   }else{
          //     pesanUmumApp('success', 'Success', 'Sukses membuat kunci baru');
          //     setTimeout(function(){
          //       renderMenu("dashboard/buat-kunci-rsa");
          //     }, 2000);
          //   }
          // });
        }
    }
});

// Inisialisasi 
function hapusKunci(id)
{
    let ds = {'id' : id}
    Swal.fire({
        title: "Hapus kunci?",
        text: "Jika kunci dihapus, video yang terikat dengan kunci tidak akan bisa di decode.. Yakin menghapus kunci ... ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.value) {
           $.post(rToHapusKunci, ds, function(data){
            console.log(data);
            divMain.titleApps = "Buat Kunci RSA";
            renderMenu("dashboard/buat-kunci-rsa");
           });
        }
      });
}

function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}

$("#tblDataKunci").dataTable();
