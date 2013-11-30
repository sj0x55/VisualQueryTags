<!-- Example using -->
<script type="text/javascript">
	$(function(){
		var queryTags = $('.queryTags').queryTags({
			sorting: true
		});

		$('.queryTagsDestroy').click(function() {
			$('.queryTags').queryTags().destroy();
		})
	});
</script>