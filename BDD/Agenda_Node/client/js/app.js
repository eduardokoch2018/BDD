jQuery(document).ready(function() {

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  $('.logoutText').click(function() {
      localStorage.setItem("user", "");
      window.location.assign("index.html")
  });


class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
          this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
            if (response.msg != "OK") alert(response.msg)
        })
    }

    actualizarEvento(evento) {

        let id = evento.id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            form_data = new FormData(),
            start_date,
            end_date,
            start_hour,
            end_hour

        start_date = start.substr(0,10)
        end_date = end.substr(0,10)
        start_hour = start.substr(11,8)
        end_hour = end.substr(11,8)

        let url = this.urlBase + "/actualizar"
        let ev = {
          id: id,
          start_date: start_date,
          end_date: end_date,
          start_hour: start_hour,
          end_hour: end_hour
        }
        $.post(url, ev, (response) => {
          if (response.msg != "OK") alert(response.msg)
        })

    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let title = $('#titulo').val(),
                start = $('#start_date').val(),
                end = $('#end_date').val(),
                start_hour = '',
                end_hour = '';

            var allDay = true
            if (!$('#allDay').is(':checked')) {
                //end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                //start = start + 'T' + start_hour
                //end = end + 'T' + end_hour
                allDay = false
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    start_hour: $('#start_hour').val(),
                    end_hour: $('#end_hour').val(),
                    allday: $('#allDay').is(':checked')
                }
                $.post(url, ev, (response) => {
                  if (response.msg == "OK") {
                    $('#titulo').val("")
                    $('#start_date').val("")
                    $('#end_date').val(""),
                    $('#start_hour').val("")
                    $('#end_hour').val("")
                    alert("Evento fue Guardado!!!")
                  } else {
                    alert(response.msg)
                  }

                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })


    }

    inicializarCalendario(eventos) {
        var temp = []
        for(var i=0; i<eventos.length; i++) {
          var f1 = moment(eventos[i].fecha_inicio).format('YYYY-MM-DD')
          var h1 = eventos[i].hora_inicio
          var f2 = moment(eventos[i].fecha_finalizacion).format('YYYY-MM-DD')
          var h2 = eventos[i].hora_finalizacion
          var fecha1 = new Date(moment(f1+' '+h1, 'YYYY-MM-DD HH:mm:ss'));
          fecha1 = addDays(fecha1,1)
          var fecha2 = new Date(moment(f2+' '+h2, 'YYYY-MM-DD HH:mm:ss'));
          fecha2 = addDays(fecha2,1)
          //
          var item = {
                      id: eventos[i].id,
                      title: eventos[i].titulo,
                      start: fecha1,
                      end: fecha2,
                      allDay: eventos[i].dia_completo};
          temp.push(item);
          //alert(eventos[i].fecha_inicio+", "+eventos[i].fecha_finalizacion);
        }

        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2018-04-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: temp,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "../img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })

        }
    }




    $(function(){
      initForm();
      var e = new EventManager();
      $('form').submit(function(event){
        event.preventDefault()
        e.anadirEvento()
      })

      var user = localStorage.getItem("user");
      sTemp = "<p>Usuario: <strong>"+user+"</strong></p>"
      $("#login").html(sTemp)

    });



    function initForm(){
      $('#start_date, #titulo, #end_date').val('');
      $('#start_date, #end_date').datepicker({
        dateFormat: "yy-mm-dd"
      });
      $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 30,
        minTime: '5',
        maxTime: '23:30',
        defaultTime: '7',
        startTime: '5:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
      });
      $('#allDay').on('change', function(){
        if (this.checked) {
          $('.timepicker, #end_date').attr("disabled", "disabled")
        }else {
          $('.timepicker, #end_date').removeAttr("disabled")
        }
      })

    }
})
