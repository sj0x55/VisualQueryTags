Example using:
	$(function(){
		var queryTags = $('.queryTags').queryTags({
			sorting: true
		});

		$('.queryTagsDestroy').click(function() {
			$('.queryTags').queryTags().destroy();
		})
	});