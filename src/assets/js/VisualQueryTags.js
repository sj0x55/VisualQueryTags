$.fn.queryTags = function(options) {
	'use strict';

	var classes = {
			container: 'qt-container',
			tags: 'qt-tags',
			tag: 'qt-tag',
			input: 'qt-input'
		},
		$this = this,
		$mainTagsContainer,
		$tagsContainer,
		$inputContainer,
		$input,

	_initialize = function() {
		var initialized = $this.data('qtInitialize');

		if (!initialized) {
			options = $.extend({
				sorting: false
			}, options || {});

			$this.data('qtInitialize', true);

			_createComponent();
			_createEvents();
		}
	},

	_createComponent = function() {
		$this.addClass(classes.container);

		_openTagsGroup($this);
		$mainTagsContainer = $tagsContainer;

		$tagsContainer.append('<li class="' + classes.input + '"><input type="text"></li>');
		$inputContainer = $this.find('.' + classes.input);
		$input = $inputContainer.find('input[type=text]');
	},

	_createEvents = function() {
		$this.click(function(){
			$input.focus();
		});

		$input.keypress(function(e) {
			if (e.which == 13 && this.value !== '') {
				if (this.value === '(' || this.value === '((' || this.value === '(((') {
					for (var i = 0; i < this.value.split('').length; i++) {
						_openTagsGroup($tagsContainer);
					}
				}
				else if (this.value === ')') {
					_closeTagsGroup();
				}
				else {
					addTag(this.value);
				}

				this.value = '';
				_moveInputToEnd();
			}
			else if (e.which == 8 && this.value === '') {
				_removeLastTag();
			}
		});
	},

	_moveInputToEnd = function() {
		$inputContainer.appendTo($mainTagsContainer);
		$input.focus();
	},

	_goToTagsGroup = function($container) {
		$this.find('.' + classes.tags + '.open').removeClass('open');
		$container.addClass('open').parents('.' + classes.tags).addClass('open');

		$tagsContainer = $container;
	},

	addTag = function(value) {
		$tagsContainer.append('<li class="' + classes.tag + '">' + value + '</li>');
	},

	_openTagsGroup = function($container) {
		$tagsContainer = $('<ul class="' + classes.tags + '"></ul>');
		$container.append($tagsContainer);

		_goToTagsGroup($tagsContainer);
	},

	_closeTagsGroup = function() {
		var $tagsContainerParent = $tagsContainer.parent('.' + classes.tags);

		if ($tagsContainerParent.length > 0) {
			$tagsContainer.removeClass('open');
			$tagsContainer = $tagsContainerParent;

			_goToTagsGroup($tagsContainer);
		}
	},

	_removeLastTag = function() {
		var $prevElement = $inputContainer.prev();
		if ($prevElement.hasClass(classes.tags)) {
			if (!$prevElement.hasClass('open')) {
				_goToTagsGroup($prevElement);
				return;
			}
			else {
				$prevElement = $prevElement.find('.' + classes.tag + ':last');
				if ($prevElement.length === 0) {
					$prevElement.closest('.' + classes.tags + '.open').remove();
					return;
				}
			}
		}

		$prevElement.remove();
	},

	destroy = function() {
		$this.removeClass(classes.container);
		$this.html('');
		$this = null;
	};

	_initialize();

	return {
		destroy: destroy
	};
};