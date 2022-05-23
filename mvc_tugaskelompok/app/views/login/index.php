<!-- Article -->
<div class="row-article m-3">
    <h2 class="display-6 text-center medium1 pt-2">Masuk!</h2>
    <p class="fs-5 text-center">Anda Admin? Pastikan masukkan nama dan kata sandi di bawah dengan benar!</p>
</div>
<div class="row article">
    <div class="row-md-12 mx-auto" style="width: fit-content;">
        <div class="" style="width: 450px;">
            <div class="card mb-4 box-shadow shadow">
                <form class="m-4" action="logcek.php" method="post">
                    <div class="alert alert-danger failed" role="alert" <?php if ($data["status"] != "failed") { echo "hidden"; } ?>>
                    <?php var_dump($data["info"]); ?>
                        <?php if (isset($data["status"]) == "failed") { for($i=0; $i < count($data["info"]); $i++) { 
                            echo $data["info"][$i], " ";
                        }; } ?>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" name="varemail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contoh: agung@gmail.com">
                        <div id="emailHelp" class="form-text">Siapa Anda? Masukkan email Anda!</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Kata Sandi</label>
                        <input type="password" name="varpassword" class="form-control" id="inputPassword6" maxlength="20">
                        <div id="emailHelp" class="form-text">Ingat kembali kata sandi Anda!</div>
                    </div>
                    <button type="submit" class="btn button2">Masuk</button>
                </form>
            </div>
        </div>
    </div>
</div>