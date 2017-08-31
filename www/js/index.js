// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("4b46c1f9-e7ff-478a-a31e-69bcded957eb")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);


  
        //dodawanie nowych druzyn
        function postContactToGoogle() {

            var teamname = $('#teamname').val();
            var localization = $('#localization').val();
            var players = $('#players').val();
            var coach = $('#coach').val();
            var contact = $('#contact').val();
            $.support.cors = true;
            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSfdjSAcWZNCjkaOOPxY4DqixGhl0JcjLSy8YRx19-r8UmVZsA/formResponse",
                data: {
                    "entry_1374157179": teamname,
                    "entry_1034292343": localization,
                    "entry_1476677440": players,
                    "entry_139890369": coach,
                    "entry_657858756": contact
                },
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function() {
                        alert("Nie udalo sie zapisac danych!");
                    },
                    200: function() {
                        alert("Twoje dane zostaly poprawnie zapisane!");
                    }
                }
            });

        }
    

    
        //pobieranie listy druzyn
        $(function() {

            var entries = [];
            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Teams";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Teams, function(i, f) {

                    if (f.Nazwa_druzyny == "#N/A" || f.Nazwa_druzyny == '') {} else {
                        var tblRow = "<tr>" + "<td>" + f.Nazwa_druzyny + "</td>" + "<td>" + '<a href="http://maps.google.com/?q=' + f.Lokalizacja + '">' + f.Lokalizacja + "</a></td>" + "<td>" + f.Zawodnicy + "</td>" + "<td>" + f.Trener + "<td>" + f.Kontakt + "</td>" + "</td>" + "</tr>"
                        $(tblRow).appendTo("#entrydata tbody");
                    }
                });

            });

        });
    


    
        //login validation

        $(function() {

            var username = $('#username').val();
            //var IsAdmin=false;
            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Admins";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Admins, function(i, f) {



                    /*
   if(f.Login==username){
   
    $("#login2").show();
   
   }
		else
		{
     $("#login2").hide();
	   }
	   */
                });

            });

        });
    

    
        function DisplayAdminPanel() {
            var IsAdmin = false;
            var username = $('#username').val();
            var userpass = $('#password').val();

            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Admins";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Admins, function(i, f) {

                    if (username == f.Login && f.Login != '' && userpass == f.Password) {
                        document.getElementById("login2").innerHTML =
                            '<a data-toggle="pill" href="#news" class="list-group-item list-group-item-action">Dodawanie aktualnosci</a>' +
                            '<a data-toggle="pill" href="#add_teams" class="list-group-item list-group-item-action">Dodawanie druzyny</a>' +
                            '<a data-toggle="pill" href="#results" class="list-group-item list-group-item-action">Dodawanie wyników</a>' +
                            '<a data-toggle="pill" href="#timetable" class="list-group-item list-group-item-action">Dodawanie terminarza</a>';


                        alert("Zostales poprawnie zalogowany!");
                        IsAdmin = true;

                    } else if (IsAdmin == false) {
                        alert("Wprowadzony login lub halo nie sa poprawne!");
                        IsAdmin = false;
                        console.log('else');
                    }

                });

            });

        }
    
    
        function HideAdminPanel() {

            document.getElementById("login2").innerHTML = '';
            alert("Zostales poprawnie wylogowany!");

        }
    


    
        $(function() {


            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Calculations";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Calculations, function(i, f) {
                    if (f.APK_Druzyny == "#N/A" || f.APK_Druzyny == '') {} else {
                        var tblRow = "<tr>" + "<td>" + f.APK_Pozycja_w_tabeli + "</td>" + "<td>" + f.APK_Druzyny + "</td>" + "<td>" + f.APK_Liczba_meczów + "</td>" + "<td>" + f.APK_Mecze_wygrane + "</td>" + "<td>" + f.APK_Mecze_przegrane + "</td>" + "<td>" + f.APK_Mecze_zremisowane + "</td>" + "<td>" + f.APK_Bramki_zdobyte + "</td>" + "<td>" + f.APK_Bramki_stracone + "</td>" + "<td>" + f.APK_Bilans_bramkowy + "</td>" + "<td>" + f.APK_Punkty + "</td>" + "</tr>"
                        $(tblRow).appendTo("#matches_table tbody");
                    }
                });

            });

        });
    


    
        function postContactToGoogle_Result() {

            var teamname1 = $('#result3').val();
            var teamname2 = $('#result4').val();
            var result_team1 = $('#result_team1').val();
            var result_team2 = $('#result_team2').val();
            var match_day = $('#match_day').val();
            var match_time = $('#match_time').val();
            $.support.cors = true;
            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSctXMIhib2RJZxWzq4CRqXItkByW1IzpOkPzU3OesLGrYEFlg/formResponse",
                data: {
                    "entry_424918670": teamname1,
                    "entry_49456644": teamname2,
                    "entry_975370286": result_team1,
                    "entry_1639927409": result_team2,
                    "entry_884365633": match_day,
                    "entry_992001111": match_time
                },
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function() {
                        alert("Nie udalo sie zapisac danych!");
                    },
                    200: function() {
                        alert("Twoje dane zostaly poprawnie zapisane!");
                    }
                }
            });

        }
    

    
        function postContactToGoogle_News() {

            var add_news = $('#add_news').val();
            var news_description = $('#news_description').val();

            $.support.cors = true;
            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSddmyP7G-yxwkP84B02XHJxgvMAAkqMi-zlBm5_nSOrWJjGAg/formResponse",
                data: {
                    "entry_755576590": add_news,
                    "entry_1455691291": news_description
                },
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function() {
                        alert("Nie udalo sie zapisac danych!");
                    },
                    200: function() {
                        alert("Twoje dane zostaly poprawnie zapisane!");
                    }
                }
            });

        }
    

    
        $(function() {
            $select = $('#result');
            var entries = [];
            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Teams";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Teams, function(i, f) {
                    $select.append('<option id="' + f.Nazwa_druzyny + '">' + f.Nazwa_druzyny + '</option>');
                });

            });

        });

        $(function() {
            $select2 = $('#result2');
            var entries = [];
            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Teams";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Teams, function(i, f) {
                    $select2.append('<option id="' + f.Nazwa_druzyny + '">' + f.Nazwa_druzyny + '</option>');
                });

            });

        });
    

    
        $(function() {
            $select3 = $('#result3');
            var entries = [];
            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Teams";
            $.getJSON(dmJSON, function(data) {

                $('#loader').html(data);
                $.each(data.Teams, function(i, f) {
                    $select3.append('<option id="' + f.Nazwa_druzyny + '">' + f.Nazwa_druzyny + '</option>');
                });

            });

        });

        $(function() {
            $select4 = $('#result4');
            var entries = [];
            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Teams";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Teams, function(i, f) {
                    $select4.append('<option id="' + f.Nazwa_druzyny + '">' + f.Nazwa_druzyny + '</option>');
                });

            });

        });
    


    
        $(function() {


            $select5 = $('#news_header');
            var entries = [];

            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=News";

            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.News, function(i, f) {
                    $select5.prepend('<div class="card-header-blue">  <h4 class="card-heading" id="' + f.Tytul + '">' + f.Tytul + '</h4></div> </br><div class="card-body"><p class="card-p" id="' + f.Tytul + '">' + f.Tresc_aktualnosci + '</p></div></br></br>');

                });

            });

        });
    


    
        $(function() {


            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Calculations";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Calculations, function(i, f) {
                    if (f.Nazwa_druzyny_1 == "#N/A" || f.Nazwa_druzyny_1 == '' || f.Nazwa_druzyny_2 == "#N/A" || f.Nazwa_druzyny_2 == '') {} else {
                        var tblRow = "<tr>" + "<td><b>" + f.Nazwa_druzyny_1 + "</b></td>" + "<td>" + f.Liczba_bramek_druzyny_1 + "</td>" + "<td>" + f.Liczba_bramek_druzyny_1 + "</td>" + "<td><b>" + f.Nazwa_druzyny_2 + "</b></td>" + "<td>" + f.Data + ' ' + f.Godzina + "</td>" + "</tr>"
                        $(tblRow).appendTo("#result_table tbody");
                    }
                });

            });

        });
    

    
        function postContactToGoogle_Timetable() {

            var timetable_team1 = $('#result').val();
            var timetable_team2 = $('#result2').val();
            var timetable_date = $('#timetable_date').val();
            var timetable_hour = $('#timetable_hour').val();
            var timetable_place = $('#timetable_place').val();

            $.support.cors = true;
            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSdsrfpC-_-FePzmDGXzqyxwwQG_8YJ0Ol5NA8lPRRRkUf4mLw/formResponse",
                data: {
                    "entry_180032544": timetable_team1,
                    "entry_608089753": timetable_team2,
                    "entry_1112198098": timetable_date,
                    "entry_1496049942": timetable_hour,
                    "entry_1289471781": timetable_place
                },
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function() {
                        alert("Nie udalo sie zapisac danych!");
                    },
                    200: function() {
                        alert("Twoje dane zostaly poprawnie zapisane!");
                    }
                }
            });

        }
    




    
        $(function() {


            var dmJSON = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1boBwGizrGX8HfzUNCo3W8PAQMl3mfQj1nxTAKSGO72k&sheet=Timetable2";
            $.getJSON(dmJSON, function(data) {
                $('#loader').html(data);
                $.each(data.Timetable2, function(i, f) {
                    if (f.Druzyna_1 == "#N/A" || f.Druzyna_1 == '' || f.Druzyna_2 == "#N/A" || f.Druzyna_2 == '') {} else {
                        var tblRow = "<tr>" + "<td><b>" + f.Druzyna_1 + " - " + f.Druzyna_2 + "</b></td>" + "<td>" + f.Data + ' ' + f.Godzina + "</td>" + "<td>" + '<a href="http://maps.google.com/?q=' + f.Miejsce + '">' + f.Miejsce + "</a></td>" + "<td>" + f.Pogoda + "</td>" + "</tr>"
                        $(tblRow).appendTo("#timetable_list tbody");
                    }
                });

            });

        });