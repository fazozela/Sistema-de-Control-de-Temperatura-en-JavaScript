var max = 50;
var min = 20;
var currentlyTemp = 30;
var regulateTemp = 30;

$("#progress").css("width", currentlyTemp + "%");
$("#ageInputId").val(currentlyTemp);
$("#ageOutputId").text(currentlyTemp);
$("#inputMaxTemp").val(max);

$("#inputMinTemp").val(min);

$(".fan").css("visibility", "hidden");

$(".fire-red").css("visibility", "hidden");

function initSensor() {
  $("#ageInputId").change(function() {
    if (currentlyTemp >= max) {
      $(".foco").replaceWith(
        '<img class="foco" src="focoalert.gif" style="width:150px"/>'
      );
      $(".ventilador").replaceWith(
        '<img class="ventilador" src="fan.gif" style="width:150px"/>'
      );
      $(".res0").text(`Se establecio una temperatura maxima de ${max} grados`);
      $(".res1").text(`Se establecio una temperatura minima de ${min} grados`);
      $(".res2").text(
        `Se procedio a tomar las acciones correctivas correspondientes`
      );
      alert("Alcanzo la temperatura maxima");
      alert("Se procedera a encender el ventilador");
    } else if (currentlyTemp <= min) {
      $(".foco").replaceWith(
        '<img class="foco" src="focoalert.gif" style="width:150px"/>'
      );
      $(".fire").replaceWith(
        '<img class="fire" src="firegif.gif" style="width:150px"/>'
      );
      $(".res0").text(`Se establecio una temperatura minima de ${min} grados`);
      $(".res1").text(`Se procedio a incrementar el calentador`);
      alert("Alcanzo la temperatura minima");
      alert("Se procedera a incrementar la temperatura");
    } else if (regulateTemp == currentlyTemp) {
      $("#progress").css("width", $("#ageInputId").val() + "%");
      $(".foco").replaceWith(
        '<img class="foco" src="foco.webp" style="width:150px"/>'
      );
      $(".ventilador").replaceWith(
        '<img class="ventilador" src="ventilador.jpg" style="width:150px"/>'
      );
    }
  });
}

var timeout = 300;

function simIncrementTemp() {
  setInter = setInterval(() => {
    console.log("aumento");
    if (currentlyTemp < max) {
      $("#ageInputId")
        .val(currentlyTemp)
        .change();
      $("#ageOutputId").text(currentlyTemp);
      $("#progress").css("width", currentlyTemp + "%");
    } else {
      clearInterval(setInter);
      regulate("DECREMENT");
      return true;
    }
    currentlyTemp++;
  }, timeout);
}

function regulate(type) {
  if (type == "DECREMENT") {
    var setInter = setInterval(() => {
      console.log("decremento", currentlyTemp);
      if (currentlyTemp >= regulateTemp) {
        $("#ageInputId")
          .val(currentlyTemp)
          .change();
        $("#ageOutputId").text(currentlyTemp);
        $("#progress").css("width", currentlyTemp + "%");
      } else {
        console.log("clear regulate");
        $(".foco").replaceWith(
          '<img class="" src="foco.webp" style="width:150px"/>'
        );
        clearInterval(setInter);
        return true;
      }
      currentlyTemp--;
    }, timeout);
  } else {
    setInter = setInterval(() => {
      console.log("aumento");
      if (currentlyTemp <= regulateTemp) {
        $("#ageInputId")
          .val(currentlyTemp)
          .change();
        $("#ageOutputId").text(currentlyTemp);
        $("#progress").css("width", currentlyTemp + "%");
      } else {
        $(".foco").replaceWith(
          '<img class="foco" src="foco.webp" style="width:150px"/>'
        );
        $(".fire").replaceWith(
          '<img class="foco" src="fire.png" style="width:150px"/>'
        );
        clearInterval(setInter);

        return true;
      }
      currentlyTemp++;
    }, timeout);
  }
}

var simDecrementTemp = function() {
  var setInter = setInterval(() => {
    console.log("decremento");
    if (currentlyTemp > min) {
      $("#ageInputId")
        .val(currentlyTemp)
        .change();
      $("#ageOutputId").text(currentlyTemp);
      $("#progress").css("width", currentlyTemp + "%");
    } else {
      clearInterval(setInter);
      regulate("INCREMENT");
      return true;
    }
    currentlyTemp--;
  }, timeout);
};

//simDecrementTemp();

initSensor();
