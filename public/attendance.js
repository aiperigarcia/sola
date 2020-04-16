
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
