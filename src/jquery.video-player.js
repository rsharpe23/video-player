import $ from 'jquery';
import YouTube from './youtube';

// $.fn.videoPlayer = function () {
//   const $element = $(this[0]);

//   if (!$element.children('iframe').length) {
//     const target = $element.data('target');
//     $element.html(`
//       <iframe src="https://www.youtube.com/embed/${target}?controls=0&autoplay=1" 
//         frameborder="0" 
//         allow="autoplay">
//       </iframe>`
//     );
//   }

//   return this;
// };

$.fn.videoPlayer = function () {
  const $element = $(this[0]);

  if (!$element.children().length) {
    const target = $element.data('target');
    $element.html(new YouTube(target).html());
  }

  return this;
};