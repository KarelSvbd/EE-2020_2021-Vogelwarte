(function ($) {


    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent



    var $btn = $("#btn");
    var $btnClear = $("#btnClear");
    var $myFinalText = $("#myFinalText");
    var $confLevel = $("#conf");

    var $myIntermediaryText = $("#myIntermediaryText");
    var textTotal = "";
    var isRecording = false;

    if ("webkitSpeechRecognition" in window) {
        var recognition = new webkitSpeechRecognition();
        var birds = ['Luscinioïde' , 'Labbe']
        var grammar = '#JSGF V1.0; grammar birds; public <bird> = Luscinioïde | Labbe;'

        var speechRecognitionList = new SpeechGrammarList();
        console.log(speechRecognitionList);
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;

        recognition.lang = "fr-FR";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        $btn.click(function (e) {
            e.preventDefault();
            if (!isRecording) {
                $btn.removeClass('btn-demarrer').addClass('btn-stop');
                $btn.text('Stop');
                recognition.start();
                isRecording = true;
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
                var transcript = e.results[i][0].transcript;
                if (e.results[i].isFinal) {
                    textTotal += transcript;
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
        })
    }


})(jQuery)