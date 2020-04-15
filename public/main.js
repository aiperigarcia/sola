/*
	Telephasic by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

document.querySelectorAll("td").forEach(cell => {
  if (cell.className != 'name') {
    cell.addEventListener('click', () => {
      cell.innerHTML = 'present'
      cell.style.background = '#4ca54c'
    })
  }
})

document.querySelectorAll("td").forEach(cell => {
  if (cell.className != 'name') {
    cell.addEventListener('dblclick', () => {
      cell.innerHTML = 'absent'
      cell.style.background = '#ce7a71'
    })
  }
})

var button = document.querySelector('#button')
var names = document.querySelectorAll('.name')
let days = document.querySelectorAll('.days')
console.log(days[0].textContent)

button.addEventListener('click', () => {
  var data = {}
  names.forEach((name, i) => {
    var studentAttendance = document.querySelectorAll(`.${name.innerText.toLowerCase()}`)
    console.log("studentAttendance", studentAttendance);
    data[name.innerText] = {}
    studentAttendance.forEach((td, i) => {
      data[name.innerText][days[i].textContent] = td.innerText;
      data[name.innerText].index = i
      console.log(td.innerText);
    });
  });
  fetch('http://localhost:7070/updateattendance', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
  .then(data => console.log(data))
	.catch(err => console.error(err))
  console.log("data", data)
})


(function($) {

  var $window = $(window),
    $body = $('body');

  // Breakpoints.
  breakpoints({
    normal: ['1081px', '1280px'],
    narrow: ['821px', '1080px'],
    narrower: ['737px', '820px'],
    mobile: ['481px', '736px'],
    mobilep: [null, '480px']
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Dropdowns.
  $('#nav > ul').dropotron({
    mode: 'fade',
    speed: 300,
    alignment: 'center',
    noOpenerFade: true
  });

  // Nav.

  // Buton.
  $(
      '<div id="navButton">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '</div>'
    )
    .appendTo($body);

  // Panel.
  $(
      '<div id="navPanel">' +
      '<nav>' +
      '<a href="index.html" class="link depth-0">Home</a>' +
      $('#nav').navList() +
      '</nav>' +
      '</div>'
    )
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      resetScroll: true,
      resetForms: true,
      side: 'top',
      target: $body,
      visibleClass: 'navPanel-visible'
    });

})(jQuery);





const taskItem = document.querySelectorAll(".toDoList")
const trash = document.getElementsByClassName("fa-trash");


Array.from(taskItem).forEach(function(element) {
  element.addEventListener('click', function() {
    const message = this.childNodes[1].innerText
    fetch('/update', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          'message': message
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        window.location.reload(true)
      })

  });
})

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    console.log("click event working")
    const message = this.parentNode.parentNode.childNodes[1].innerText
    console.log(task)
    fetch('homework', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'message': message
      })
    }).then(function(response) {
      console.log(response)
      window.location.reload()
    })
  });
});
