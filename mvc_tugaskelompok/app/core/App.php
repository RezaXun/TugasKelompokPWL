<?php

class App {
    protected $controller = "Home";
    protected $method = "index";
    protected $params = [];

    public function __construct()
    {
        $url = $this->parseURL();
        
        // controller
        if (file_exists("../app/controllers/" . $url[0] . ".php")) {
            $this->controller = $url[0];
            unset($url[0]);
        }

        require_once "../app/controllers/" . $this->controller . ".php";
        $this->controller = new $this->controller;

        // methode
        if (isset($url[1])) {
            if (method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }

        //params
        if (!empty($url)) {
            array_values($url);
            $this->params = array_values($url);
        }

        //jalankan controller & method, kirimkan parameter
        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parseURL()
    {
        if (isset($_GET["url"])) {
            $url = $_GET["url"];
            $url = rtrim($url, '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);

            // for ($i=0; $i < count($url); $i++) { 
            //     echo $url[$i], "<br>";
            // }

            return $url;
        };        
    }
};