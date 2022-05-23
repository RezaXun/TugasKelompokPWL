<?php

class Home extends Controller {
    public function index()
    {
        $data["judul"] = "Daftar Mahasiswa";
        $data["mahasiswa"] = $this->model("Index_model")->getAllMhs();

        $this->view("templates/header", $data);
        $this->view("home/index", $data);
        $this->view("templates/footer");
    }
}