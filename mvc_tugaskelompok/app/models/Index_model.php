<?php

require_once("Main_model.php");

class Index_model extends Main_model{
    // private $mhs = [
    //     [
    //         "nama" => "Muhammad Irfan Arisani",
    //         "nim" => "A11.2020.12634",
    //         "jurusan" => "Teknik Informatika - S1"
    //     ],
    //     [
    //         "nama" => "Reza Syahpahlevi M",
    //         "nim" => "A11.2020.12871",
    //         "jurusan" => "Teknik Informatika - S1"
    //     ],
    //     [
    //         "nama" => "Leo Fahrizal",
    //         "nim" => "A21.2020.13245",
    //         "jurusan" => "Pendidikan Fisika - S1"
    //     ]
    // ];
    public function getAllMhs()
    {
        return $this->all();
    }
}