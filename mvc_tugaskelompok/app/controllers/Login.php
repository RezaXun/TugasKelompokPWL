<?php

class Login extends Controller {
    public function index($p1 = "", $p2 = "")
    {
        $data["judul"] = "Masuk";
        $data["status"] = $p1;
        $p2new = explode("%20", $p2);
        $data["info"] = $p2new;

        $this->view("templates/header", $data);
        $this->view("login/index", $data);
        $this->view("templates/footer");
    }
}