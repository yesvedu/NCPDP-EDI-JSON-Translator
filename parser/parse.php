<?php

function parseEDI($ediText)
{

    $ediText = trim($ediText);

    $segments = explode("~", $ediText);

    $parsed = [];

    foreach($segments as $segment){

        $segment = trim($segment);

        if($segment=="")
            continue;

        $fields = explode("*",$segment);

        $segmentName = array_shift($fields);

        if(!isset($parsed[$segmentName])){

            $parsed[$segmentName]=[];

        }

        $parsed[$segmentName][]=$fields;

    }

    return $parsed;

}

?>