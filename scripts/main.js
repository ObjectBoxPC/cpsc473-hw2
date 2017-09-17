var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
	'use strict';
	var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
	detailImage.setAttribute('src', imageUrl);

	var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
	detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
	'use strict';
	return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
	'use strict';
	return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
	'use strict';
	setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumbnail) {
	'use strict';
	thumbnail.addEventListener('click', function(event) {
		event.preventDefault();
		setDetailsFromThumb(thumbnail);
	});
}

function getThumbnailsArray() {
	'use strict';
	var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
	var thumbnailArray = [].slice.call(thumbnails);
	return thumbnailArray;
}

function initializeEvents() {
	'use strict';
	var thumbnails = getThumbnailsArray();
	thumbnails.forEach(addThumbClickHandler);
	insertHiddenImage(thumbnails);
}

function getRandomElement(list) {
	var randomIndex = Math.floor(Math.random() * list.length);
	return list[randomIndex];
}

function insertHiddenImage(thumbnails) {
	var imageUrl = 'img/tacocat.jpg';
	var randomThumbnail = getRandomElement(thumbnails);
	var originalImageUrl = randomThumbnail.getAttribute('data-image-url');
	randomThumbnail.setAttribute('data-image-url-original', originalImageUrl);
	randomThumbnail.setAttribute('data-image-url', imageUrl);
	randomThumbnail.addEventListener('click', function() {
		resetThumbnails(thumbnails);
		insertHiddenImage(thumbnails);
	});
}

function resetThumbnails(thumbnails) {
	thumbnails.forEach(function(thumbnail) {
		if(thumbnail.hasAttribute('data-image-url-original')) {
			var originalImageUrl = thumbnail.getAttribute('data-image-url-original');
			thumbnail.removeAttribute('data-image-url-original');
			thumbnail.setAttribute('data-image-url', originalImageUrl);
		}
	});
}

initializeEvents();
