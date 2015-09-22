<template>
    <router-view></router-view>
</template>

<script>
	module.exports = {
		data: function () {
			return {}
		}, 
		components: {
		    navComponent: 		require('./components/nav.vue'),
		    footerComponent: 	require('./components/footer.vue')
		}
	}
</script>