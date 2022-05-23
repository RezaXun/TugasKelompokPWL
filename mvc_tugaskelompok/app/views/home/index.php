<div class="container">
    <h2 class="m-3">Daftar Mahasiswa</h2>
    <div class="row-article m-3 mb-4">
        <table class="table table-bordered table-hover table-striped bg-white shadow">
            <thead>
                <tr>
                    <th>#</th>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Angkatan</th>
                    <th>Fakultas</th>
                    <th>Program</th>
                    <!-- <th>Edit</th> -->
                </tr>
            </thead>
            <tbody>
                <?php
                // echo var_dump(mysqli_fetch_array($data["mahasiswa"]));
                $i = 1;
                while ($hasil = mysqli_fetch_array($data["mahasiswa"])) {
                ?>
                <tr>
                    <td><?php echo $i; ?></td>
                    <td><?php echo $hasil["nim"]; ?></td>
                    <td><?php echo $hasil["nama"]; ?></td>
                    <td><?php echo $hasil["angkatan"]; ?></td>
                    <td><?php echo $hasil["fakultas"]; ?></td>
                    <td><?php echo $hasil["program"]; ?></td>
                    <!-- <td>
                        <a href="#" class="btn fw-bold btn-sm button2">Edit</a>
                        <a href="#" class="btn fw-bold btn-sm btn-outline-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?')">Hapus</a>
                    </td> -->
                </tr>
                <?php $i++; } ?>
                <!-- <tr>
                    <td colspan="7" class="text-center">
                        <a href="insert.php" class="btn fw-bold btn-sm btn-success">Tambah</a>
                    </td>
                </tr> -->
            </tbody>
        </table>
    </div>
</div>