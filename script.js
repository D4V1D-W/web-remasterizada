document.addEventListener("DOMContentLoaded", function(){

    // =========================
    // MENU MOBILE
    // =========================

    const toggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    toggle.addEventListener("click", function(){

        navLinks.classList.toggle("active");

    });

    // =========================
    // MENU ACCESIBILIDAD
    // =========================

    const accessibilityBtn =
        document.getElementById("accessibility-btn");

    const accessibilityMenu =
        document.getElementById("accessibility-menu");

    accessibilityBtn.addEventListener("click", function(){

        accessibilityMenu.classList.toggle("active");

    });

    // =========================
    // DALTONISMO
    // =========================

    const colorblindBtn =
        document.getElementById("colorblind-btn");

    colorblindBtn.addEventListener("click", function(){

        document.body.classList.toggle(
            "colorblind-mode"
        );

    });

    // =========================
    // TEXTO GRANDE
    // =========================

    const increaseTextBtn =
        document.getElementById("increase-text-btn");

    increaseTextBtn.addEventListener("click", function(){

        document.body.classList.toggle(
            "large-text"
        );

    });



// =========================
// NARRADOR ACCESIBLE
// =========================

let voiceEnabled = false;

const voiceToggle =
    document.getElementById(
        "voice-toggle"
    );

// ACTIVAR / DESACTIVAR

voiceToggle.addEventListener(
    "click",
    function(){

        voiceEnabled = !voiceEnabled;

        speechSynthesis.cancel();

        if(voiceEnabled){

            voiceToggle.innerText =
                "🔊 Narrador Activado";

        } else {

            voiceToggle.innerText =
                "🔇 Narrador Desactivado";

        }

    }
);

// ELEMENTOS LEIBLES

const readableElements =
    document.querySelectorAll(
        "h1, h2, h3, p, a, button"
    );

// FUNCION DE VOZ

function speakText(text){

    if(!voiceEnabled) return;

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "es-ES";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);

}

// EVENTOS PARA PC Y MOVIL

readableElements.forEach(function(element){

    // PC

    element.addEventListener(
        "mouseenter",
        function(){

            if(window.innerWidth > 768){

                speakText(
                    element.innerText
                );

            }

        }
    );

    // CELULAR

    element.addEventListener(
        "touchstart",
        function(){

            if(window.innerWidth <= 768){

                speakText(
                    element.innerText
                );

            }

        }
    );

});

// =========================
// LECTOR DE TEXTO
// =========================

const readableElements =
    document.querySelectorAll(
        "h1, h2, h3, p, a, .card-content"
    );

readableElements.forEach(function(element){

    element.addEventListener("click", function(){

        if(!voiceEnabled) return;

        let texto = element.innerText;

        if(texto.trim() !== ""){

            speechSynthesis.cancel();

            let voz =
                new SpeechSynthesisUtterance(texto);

            voz.lang = "es-ES";

            voz.rate = 1;

            voz.pitch = 1;

            speechSynthesis.speak(voz);

        }

    });

});
});


// =========================
// VALIDACION RESERVAS
// =========================

const reservationForm =
    document.getElementById(
        "reservation-form"
    );

const reservationMessage =
    document.getElementById(
        "reservation-message"
    );

// FECHA MINIMA = HOY

const dateInput =
    document.getElementById("date");

const today =
    new Date().toISOString().split("T")[0];

dateInput.min = today;

// VALIDACION

reservationForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const people =
            document.getElementById(
                "people"
            ).value;

        const phone =
            document.getElementById(
                "phone"
            ).value;

        // VALIDACION PERSONAS

        if(people <= 0){

            reservationMessage.innerText =
                "❌ Número inválido de personas.";

            reservationMessage.style.color =
                "red";

            return;

        }

        // VALIDACION TELEFONO

        if(phone.length < 7){

            reservationMessage.innerText =
                "❌ Número telefónico inválido.";

            reservationMessage.style.color =
                "red";

            return;

        }

        // EXITO

        reservationMessage.innerText =
            "✅ Reserva enviada correctamente.";

        reservationMessage.style.color =
            "green";

        reservationForm.reset();

    }
);