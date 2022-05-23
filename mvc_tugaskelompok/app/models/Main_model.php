<?php
define("server", "localhost");
define("user", "root");
define("pass", "");
define("db", "mvc");

class Main_model {
    public $connection;

    public function __construct() {
        $this->connection = new mysqli(server, user, pass, db);
    }

    public function add($nim, $nama, $angkatan, $fakultas, $program) {
        $sql = "insert into mahasiswa(nim, nama, angkatan, fakultas, program) values ('$nim','$nama','$angkatan','$fakultas','$program')";
        $hasil = $this->connection->query($sql);
        return $hasil;
    }

    public function all() {
        $sql = "select * from mahasiswa";
        $hasil = $this->connection->query($sql);
        return $hasil;
    }

    public function choose($nim) {
        $sql = "select * from mahasiswa where nim = '$nim'";
        $hasil = $this->connection->query($sql);
        return $hasil;
    }

    public function update($nim, $nama, $angkatan, $fakultas, $program) {
        $sql = "update mahasiswa set nama = '$nama', angkatan = '$angkatan', fakultas = '$fakultas', program = '$program' where nim = '$nim'";
        $hasil = $this->connection->query($sql);
        return $hasil;
    }

    public function delete($nim) {
        $sql = "delete from mahasiswa where nim = '$nim'";
        $hasil = $this->connection->query($sql);
        return $hasil;
    }
}