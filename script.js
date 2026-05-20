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
// CONTROL NARRADOR
// =========================

let voiceEnabled = false;

const voiceToggle =
    document.getElementById("voice-toggle");

voiceToggle.addEventListener("click", function(){

    voiceEnabled = !voiceEnabled;

    speechSynthesis.cancel();

    if(voiceEnabled){

        voiceToggle.innerText =
            "🔊 Narrador Activado";

        // DESBLOQUEAR AUDIO MOVIL

        speechSynthesis.speak(
            new SpeechSynthesisUtterance("")
        );

    } else {

        voiceToggle.innerText =
            "🔇 Narrador Desactivado";

    }

});

// =========================
// LECTOR DE TEXTO
// =========================

const readableElements =
    document.querySelectorAll(
        "h1, h2, h3, p, a, button, .card-content"
    );

// FUNCION LEER

function speakText(texto){

    if(!voiceEnabled) return;

    if(texto.trim() === "") return;

    speechSynthesis.cancel();

    let voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 1;

    voz.pitch = 1;

    voz.volume = 1;

    speechSynthesis.speak(voz);

}

// =========================
// PC
// =========================

readableElements.forEach(function(element){

    element.addEventListener(
        "mouseover",
        function(){

            if(window.innerWidth > 768){

                speakText(
                    element.innerText
                );

            }

        }
    );

});

// =========================
// MOVIL
// =========================

readableElements.forEach(function(element){

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