<?php

function convertReadable($parsed)
{

    $output=[];

    if(isset($parsed["ISA"])){

        $isa=$parsed["ISA"][0];

        $output["ISA"]=[

            "Sender"=>$isa[5]??"",

            "Receiver"=>$isa[7]??"",

            "Date"=>$isa[8]??"",

            "Time"=>$isa[9]??"",

            "Version"=>$isa[11]??"",

            "Control"=>$isa[12]??""

        ];

    }

    if(isset($parsed["GS"])){

        $gs=$parsed["GS"][0];

        $output["GS"]=[

            "Sender"=>$gs[1]??"",

            "Receiver"=>$gs[2]??"",

            "Date"=>$gs[3]??"",

            "Version"=>$gs[7]??""

        ];

    }

    if(isset($parsed["ST"])){

        $st=$parsed["ST"][0];

        $output["ST"]=[

            "Transaction"=>$st[0]??"",

            "Control"=>$st[1]??""

        ];

    }

    if(isset($parsed["NM1"])){

        $output["NM1"]=[];

        foreach($parsed["NM1"] as $nm1){

            $output["NM1"][]=[

                "Entity"=>$nm1[0]??"",

                "Type"=>$nm1[1]??"",

                "LastName"=>$nm1[2]??"",

                "FirstName"=>$nm1[3]??"",

                "ID"=>$nm1[8]??""

            ];

        }

    }

    return $output;

}

?>