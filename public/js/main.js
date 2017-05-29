
// make link in nav active wen on page
var thisLocation = window.location.href.split('/')[3];
var a = document.querySelector('a[href="/'+thisLocation+'"]').classList.add('active');


// create project script

if (window.location.href.indexOf('/projects/create') != -1){

  var checkBoxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');

  var cards = document.querySelectorAll('.icn-card');

  var actions = document.querySelectorAll('.icn-action');

  var closes = document.querySelectorAll('.icn-close');

  var submits = document.querySelectorAll('.icn-edit-submit');

  for (var i = 0; i < checkBoxes.length; i++) {
    console.log(checkBoxes[i].getAttribute('user'));

    checkBoxes[i].onchange = function() {
      if(this.checked) {
        // Checkbox is checked.
        console.log(this.getAttribute('user'));

        document.querySelector('[icn-user="'+this.getAttribute('user')+'"]').classList.remove('hidden');
      } else {
        // Checkbox is not checked.
        document.querySelector('[icn-user="'+this.getAttribute('user')+'"]').classList.add('hidden');
      }
    }
  }

  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.add('hidden');
  }

  for (var i = 0; i < actions.length; i++) {
    actions[i].addEventListener('click', function() {
      document.querySelector('[icn-user-edit="'+this.parentNode.getAttribute('icn-user')+'"]').classList.remove('hidden');
      this.parentNode.classList.add('hidden');
    });
  }

  for (var i = 0; i < submits.length; i++) {
    submits[i].addEventListener('submit', function(e) {
      e.preventDefault();
      document.querySelector('[icn-user="'+this.parentNode.getAttribute('icn-user-edit')+'"]').classList.remove('hidden');
      this.parentNode.classList.add('hidden');
    });
  }

  for (var i = 0; i < closes.length; i++) {
    closes[i].addEventListener('click', function(e) {
      document.querySelector('[icn-user="'+this.parentNode.getAttribute('icn-user-edit')+'"]').classList.remove('hidden');
      this.parentNode.classList.add('hidden');
    });
  }

} else if (window.location.href.indexOf('/files') != -1) {

  var action = document.querySelectorAll('.action-button');

  for (var i = 0; i < action.length; i++) {
  	action[i].addEventListener('click', function(e) {
  		e.preventDefault();
  		// alert('hoi');
      this.parentNode.parentNode.querySelector('.action-menu').classList.toggle('hidden');
  	});
  }

}
