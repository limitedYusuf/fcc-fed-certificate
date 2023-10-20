$(document).ready(function () {
   $('.drum-pad').click(function () {
      const audio = $(this).find('audio')[0];
      audio.play();
      const key = $(this).data('key');
      $('#display').text(key);
   });

   $(document).keydown(function (e) {
      const key = e.key.toUpperCase();
      const drumPad = $('.drum-pad[data-key="' + key + '"]');
      if (drumPad.length > 0) {
         const audio = drumPad.find('audio')[0];
         audio.play();
         $('#display').text(drumPad.data('key'));
      }
   });
});