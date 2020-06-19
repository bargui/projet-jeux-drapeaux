var couleurDrapeau = ['','white','red', 'blue', 'yellow', 'red', 'black', 'white', 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'green', 'red','white','red','blue','red','yellow','black'];
var niveauEnCours = $("#niveau");
var tabPays = [" la France", " la Belgique", " l'Italie", " la Roumanie", " la GuinÃ©e", " les Pays-Bas", " l'Allemagne"];
var chronoP;
var btn;
var i = 1;
var compteur = 0;
var valActuelle;
var p = 0;
var k = 0;  
var level = 1;
var result = false;

$.load = init();

function init(){
    
    changerPays();
    chronoP=$('#timer');
    $('.btn-warning').click(replay);
    $('#drapeaux').one("click",lancerChrono);
    nombreClicks();
    changerCouleur();
    $("#boutton").click(function() {      
        verifDrapeau();  
        changeNiveau(); 
        stopTimer();        
    });    
};

function replay(){
    location.reload(true);
}

function lancerChrono(){
    var startTime = new Date();
    decompte = setInterval(function () {
        var seconds = Math.round(
            (new Date().getTime() - startTime.getTime()) / 1000 );
        var minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        chronoP.html(ajouteUnZero(minutes) + ":" + ajouteUnZero(seconds));
    }, 1000);
};

function ajouteUnZero(a) {
    if (parseInt(a) < 10) {
        a = '0' + a;
    };
    return a;
};

function stopTimer(){    
    if(result == true && compteur == tabPays.length){
        clearInterval(decompte);
        $('#drapeaux').off('click');
        $('#boutton').css({
            display : 'none'
        });    
        $('.btn-warning').css('display','block');    
    }        
};

function changeNiveau() {
    if (result == true && i < tabPays.length){
        i++;
        niveauEnCours = niveauEnCours.text(+level+"/"+tabPays.length);
        changerPays();
        if(i==tabPays.length-1){
            $('#0').attr('class','bleu horizontal')
            $('#1').attr('class','horizontal bleu bleuMilieu')
            $('#2').attr('class','bleu horizontal')
        }
    } else if ( i == tabPays.length ) {
        niveauEnCours = niveauEnCours.text(" 7/7");     
    }
};

function changerCouleur(){
    $(".bleu").each(function(){ 
        $(this).click(function(){
            var j = $(this).val(); 
            j++;                       
            $(".bleu").eq(this.id).css('background-color', couleurDrapeau[j]);
            if(j == 3){
                j = 0;
            } 
            $(this).val(j);
        });        
    });
};

function verifDrapeau(){
    var verif = "0";
    result = false;

    $(".bleu").each(function(){        
        verif += $(this).val();
    });
    
    if(verif == "012" || verif == "0012") {
        couleurDrapeau.splice(1, 3);
        $(".bleu").css('background-color', couleurDrapeau[3]);
        result = true;
        $('#bravo').html("Bravo !");
        if (level < tabPays.length){
            $('#exampleModalScrollableTitle').html("Niveau "+level+"/"+tabPays.length+" rÃ©ussi.");
        } else {
            $('#exampleModalScrollableTitle').html("Fin du jeu en "+k+" clicks et en "+chronoP.text()+"min");
        }
        compteur++;
        level++;
    } else {
        $('#bravo').html("Erreur !");        
    }
}

function nombreClicks(){ 
    $('#drapeaux').on("click", clicksPlus);    
}

function clicksPlus(){
    console.log(k);
    valActuelle = $('#nbClicks').text(1+k);
    k++;
}

function changerPays() {
    $('#titre').html(tabPays[p]);
    p++;
    $("#1").val(0);
    $("#2").val(0);
    $("#3").val(0);
}