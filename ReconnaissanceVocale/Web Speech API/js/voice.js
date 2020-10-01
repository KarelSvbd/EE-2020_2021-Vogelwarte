(function ($) {


    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent



    var $btn = $("#btn");
    var $btnClear = $("#btnClear");
    var $myFinalText = $("#myFinalText");
    var $confLevel = $("#conf");
    var $divAlter = $("#alternative");


    var $myIntermediaryText = $("#myIntermediaryText");
    var textTotal = "";
    var isRecording = false;
    var alternativeList = [''];
    var nb = 0;

    if ("webkitSpeechRecognition" in window) {
        var recognition = new webkitSpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();

        var birds = ['Luscinioïde', 'Labbe parasite'];
        var grammar = '#JSGF V1.0; grammar birds; public <bird> = ' + birds.join(' | ') + ' ;'
        console.log(grammar);
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;


        recognition.lang = "de-DE";
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 10;

        $btn.click(function (e) {
            e.preventDefault();
            if (!isRecording) {
                $btn.removeClass('btn-demarrer').addClass('btn-stop');
                $btn.text('Stop');
                recognition.start();
                isRecording = true;

                let u = new SpeechSynthesisUtterance();
                u.text = "Halsbandschnäpper";
                u.lang = "de-DE";
                speechSynthesis.speak(u);

            }
            else {
                $btn.removeClass('btn-stop').addClass('btn-demarrer');
                $btn.text('Démarrer');
                recognition.stop();
                isRecording = false;
            }
        });

        recognition.onresult = function (e) {
            var intermediary = "";

            for (var i = e.resultIndex; i < e.results.length; i++) {
                
                alternativeList[nb] = e.results[i][0].transcript;
                nb++;
                var transcript = e.results[i][0].transcript;

                if (e.results[i].isFinal) {
                    textTotal += transcript;

                    if (recognition.continuous == false) {
                        $btn.removeClass('btn-stop').addClass('btn-demarrer');
                        $btn.text('Démarrer');
                        recognition.stop();
                        isRecording = false;
                    }
                    for (j = 0; j < alternativeList.length; j++) {

                        document.getElementById("alternative").innerHTML += '<span>' + alternativeList[j] + '</span> <br>';

                    }
                    nb=0;
                    break;
                }
                else {
                    intermediary += transcript;
                    $confLevel.html('Confidence: ' + e.results[i][0].confidence)
                }
            }

            $myFinalText.html(textTotal);
            $myIntermediaryText.html(intermediary);
        };
        $myIntermediaryText.html("");

        $btnClear.click(function () {
            $myFinalText.html("");
            textTotal = "";
        })
    }


})(jQuery)