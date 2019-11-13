<script>
	import ApolloClient from "apollo-boost";
	import { setClient } from "svelte-apollo";
	import Todo from '../components/Todo.svelte';

	const URL = 'https://graphql.fauna.com/graphql';

	const FAUNADB_SERVER_SECRET = 'fnADbf-2M8ACCzjIjJa3FUDuOTLeg-ur1Nn4GIq0'

	const client = new ApolloClient({
		uri: URL,

		request: operation => {
			operation.setContext({
				headers: {
					"Authorization": "Bearer " + FAUNADB_SERVER_SECRET
				},
			});
		},
		onError: ({ networkError, graphQLErrors }) => {
			console.log("graphQLErrors", graphQLErrors);
			console.log("networkError", networkError);
		}
	});

	setClient(client);
</script>

<svelte:head>
	<title>Demo API</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn">

	<!--Grid column-->
	<div class="col-md-6 mb-4">

		<!--Card-->
		<div class="card">

			<!-- Card header -->
			<div class="card-header">Demo API</div>

			<!--Card content-->
			<div class="card-body">
				<Todo/>
			</div>

		</div>
		<!--/.Card-->

	</div>
	<!--Grid column-->

</div>
<!--Grid row-->
