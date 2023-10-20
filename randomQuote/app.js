$(document).ready(function () {
   function fetchRandomQuote() {
      $.ajax({
         url: 'https://api.quotable.io/random',
         dataType: 'json',
         success: function (data) {
            $('#text').text(data.content);
            $('#author').text('- ' + data.author);
            $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(data.content + ' - ' + data.author));
         },
         error: function () {
            console.log('Gagal memuat kutipan.');
         }
      });
   }

   fetchRandomQuote();

   $('#new-quote').on('click', function () {
      fetchRandomQuote();
   });
});