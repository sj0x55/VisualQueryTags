Example using:

	$(function(){
		$('.queryTags').queryTags({
			sorting: true
		});

		$('.queryTagsDestroy').click(function() {
			$('.queryTags').queryTags().destroy();
		})
	});
