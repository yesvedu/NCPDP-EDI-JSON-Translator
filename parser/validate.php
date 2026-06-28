<?php

function validateEDI($parsed)
{

    $errors=[];

    $required=[

        "ISA",
        "GS",
        "ST",
        "SE",
        "GE",
        "IEA"

    ];

    foreach($required as $segment){

        if(!isset($parsed[$segment])){

            $errors[]="$segment segment missing";

        }

    }

    return [

        "valid"=>count($errors)==0,

        "errors"=>$errors

    ];

}

?>