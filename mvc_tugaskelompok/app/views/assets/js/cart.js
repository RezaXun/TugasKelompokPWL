var cart = {
    // (A) PROPERTIES
    hPdt : null, // HTML products list
    hItems : null, // HTML current cart
    items : {}, // Current items in cart

    // (B) LOCALSTORAGE CART
    // (B1) SIMPAN KERANJANG SAAT INI KE PENYIMPANAN LOKAL
    save : () => {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  
    // (B2) MUAT KERANJANG DARI PENYIMPANAN LOKAL
    load : () => {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },
  
    // (B3) KOSONGKAN SELURUH KERANJANG
    nuke : () => {
      if (confirm("Yakin ingin mengosongkan keranjang belanja?")) {
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
      }
    },

    rpConvert : (test) => {
      // ini adalah fungsi konversi harga ke format rupiah
      var formatter = new Intl.NumberFormat("id-ID", {
          style: "currency", currency: "IDR", minimumFractionDigits: 0
      });

      var temp = formatter.format(test);
      test = temp;
      return test;
    },
  
    // (C) INITIALIZE
    init : () => {
      // (C1) GET HTML ELEMENTS
      cart.hPdt = document.getElementById("cart-products");
      cart.hItems = document.getElementById("cart-items");
  
      // (C2) DRAW PRODUCTS LIST
      cart.hPdt.innerHTML = "";
      var counter = 1, pcounter = 1;
      let p, item, part;
      for (let id in products) {
        // WRAPPER
        p = products[id];
        item = document.createElement("div");
        item.className = "col-md-4 "+p.category.toLowerCase();
        item.id = "prod"+pcounter;
        item.style.display = "block";
        cart.hPdt.appendChild(item);

        // PRODUCT IMAGE
        part = document.createElement("div");
        part.className = "card mb-4 box-shadow shadow";
        part.id = "wrapper"+counter;
        item.appendChild(part);

        part = document.createElement("svg");
        part.className = "bd-placeholder-img card-img-top";
        part.setAttribute("width","100%");
        part.setAttribute("height","250px");
        part.setAttribute("role", "img")
        part.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        part.setAttribute("aria-label", "Placeholder: Thumbnail")
        part.setAttribute("preserveAspectRatio", "xMidYMid slice")
        part.setAttribute("focusable", "false")
        part.id = "wrapper-svg"+counter;
        document.getElementById("wrapper"+counter).appendChild(part);

        part = document.createElement("img");
        part.setAttribute("width","100%");
        part.setAttribute("height","250px");
        part.style.objectFit = "contain";
        part.src = p.img;
        part.className = "p-img"; //link gambar
        document.getElementById("wrapper-svg"+counter).appendChild(part);
        counter++;

        part = document.createElement("div");
        part.className = "card-body";
        part.id = "wrapper"+counter;
        counter--;
        document.getElementById("wrapper"+counter).appendChild(part);
        counter++;

        part = document.createElement("h3");
        part.innerHTML = p.name;
        part.className = "p-name"; //nama produk
        document.getElementById("wrapper"+counter).appendChild(part);
        counter++;

        part = document.createElement("div");
        part.className = "d-flex justify-content-between align-items-center";
        part.id = "wrapper"+counter;
        counter--;
        document.getElementById("wrapper"+counter).appendChild(part);
        counter++;

        part = document.createElement("button");
        part.setAttribute("type", "button");
        part.className = "cart p-add btn btn-sm button2";
        part.append("Tambahkan ke Keranjang!");
        part.onclick = () => { cart.add(id); };
        document.getElementById("wrapper"+counter).appendChild(part);

        part = document.createElement("medium");
        part.innerHTML = cart.rpConvert(p.price);
        part.className = "text fw-bold p-price"; //harga produk
        part.id = "p-price"+pcounter;
        part.style.color = "#198754";
        document.getElementById("wrapper"+counter).appendChild(part);

        counter++;
        pcounter++;
      }
      item = document.createElement("div");
      item.innerText = pcounter;
      item.style.display = "none";
      item.id = "countforproducts";
      cart.hPdt.appendChild(item);
  
      // (C3) LOAD CART FROM PREVIOUS SESSION
      cart.load();
  
      // (C4) LIST CURRENT CART ITEMS
      cart.list();
    },
  
    // (D) LIST CURRENT CART ITEMS (IN HTML)
    list : () => {
      // (D1) RESET
      cart.hItems.innerHTML = "";
      let item, part, pdt;
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { empty = false; break; }
      }
  
      // (D2) CART IS EMPTY
      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "Keranjang Belanja Masih Kosong!";
        cart.hItems.appendChild(item);
        document.getElementById("badge").innerHTML = 0;
      }
  
      // (D3) CART IS NOT EMPTY - LIST ITEMS
      else {
        let p, total = 0, subtotal = 0, qty = 0, counter = 1;
        for (let id in cart.items) {
          p = products[id];

          item = document.createElement("div");
          item.className = "d-flex mb-3";
          item.id = "d-flex"+counter;
          cart.hItems.appendChild(item);

          part = document.createElement("img");
          part.setAttribute("width","70px");
          part.setAttribute("height","70px");
          part.style.objectFit = "contain";
          part.src = p.img
          part.className = "me-2";
          item.appendChild(part);

          // ITEM
          item = document.createElement("div");
          item.className = "c-item";
          document.getElementById("d-flex"+counter).appendChild(item);
  
          // NAME
          part = document.createElement("h5");
          part.innerHTML = p.name;
          part.className = "c-name";
          item.appendChild(part);

          part = document.createElement("div");
          part.className = "input-group";
          part.setAttribute("role", "group");
          part.setAttribute("aria-label", "Basic example");
          part.id = "item"+counter;
          item.appendChild(part);

          part = document.createElement("input");
          part.type = "button";
          part.className = "c-del cart btn btn-outline-danger";
          part.setAttribute("value", "Hapus");
          part.onclick = () => { cart.remove(id);};
          document.getElementById("item"+counter).appendChild(part);

          part = document.createElement("input");
          part.type = "number";
          part.className = "form-control c-qty";
          part.id = "c-qty";
          part.min = 0;
          part.readOnly = true;
          part.style.width = "90px";
          part.value = cart.items[id];
          qty += Number(part.value)
          part.onchange = function () { cart.change(id, this.value); };
          document.getElementById("item"+counter).appendChild(part);
          document.getElementById("badge").innerHTML = qty;

          part = document.createElement("input");
          part.type = "button";
          part.className = "fw-bold btn btn-outline-success";
          part.setAttribute("value", "+");
          part.onclick = () => { cart.add(id); };
          document.getElementById("item"+counter).appendChild(part);

          part = document.createElement("input");
          part.type = "button";
          part.className = "fw-bold btn btn-outline-warning";
          part.setAttribute("value", "-");
          part.onclick = () => { cart.minus(id); };
          document.getElementById("item"+counter).appendChild(part);
          counter++;
  
          // SUBTOTAL
          subtotal = cart.items[id] * p.price;
          total += subtotal;
        }
  
        // TOTAL AMOUNT
        item = document.createElement("h6");
        item.className = "c-total";
        item.id = "c-total";
        item.innerHTML = "Total Harga: "+cart.rpConvert(total);
        cart.hItems.appendChild(item);

        part = document.createElement("div");
        part.className = "col-md-12 text-center";
        cart.hItems.appendChild(part);
  
        // EMPTY BUTTONS
        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.onclick = cart.nuke;
        item.className = "c-empty cart fw-bold btn btn-danger me-2";
        part.appendChild(item);
  
        // CHECKOUT BUTTONS
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout";
        item.onclick = cart.checkout;
        item.className = "c-checkout cart me-md-2 btn btn-success";
        part.appendChild(item);
      }
    },
  
    // (E) ADD ITEM INTO CART
    add : (id) => {
      if (cart.items[id] == undefined) { cart.items[id] = 1; }
      else { cart.items[id]++; }
      cart.save(); cart.list();
    },

    // (E) MINUS ITEM INTO CART
    minus : (id) => {
      if (cart.items[id] == undefined) { cart.items[id] = 1; }
      else { cart.items[id]--; }
      cart.save(); cart.list();
    },
  
    // (F) CHANGE QUANTITY
    change : (pid, qty) => {
      // (F1) REMOVE ITEM
      if (qty <= 0) {
        delete cart.items[pid];
        cart.save(); cart.list();
      }
  
      // (F2) UPDATE TOTAL ONLY
      else {
        cart.items[pid] = qty;
        var total = 0;
        for (let id in cart.items) {
          total += cart.items[id] * products[id].price;
          document.getElementById("c-total").innerHTML = total;
        }
      }
    },
  
    // (G) REMOVE ITEM FROM CART
    remove : (id) => {
      delete cart.items[id];
      cart.save();
      cart.list();
    },
  
    // (H) CHECKOUT
    checkout : () => {
      function makeCode(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };
      if (document.getElementById("usercheck").innerText != "Keluar") {
        alert("Anda belum masuk pada satupun akun terdaftar, silahkan masuk terlebih dahulu untuk dapat melanjutkan pembayaran!");
        window.open("login.php","_self");
      } else {
        var kode = makeCode(10);
        alert("Terima kasih telah berbelanja di Sambongrejo Web!\nBerikut adalah kode transaksi pembayaran Anda:\n "+kode);
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
      };
      
    }
  };
  window.addEventListener("DOMContentLoaded", cart.init);
  