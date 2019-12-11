<script>
  import {onMount} from "svelte";
  import {getClient, query, mutate} from 'svelte-apollo';
  import {_} from "svelte-i18n";
  import {stores} from "@sapper/app";
  import {GET_ORGANIZATIONS, CREATE_ORGANIZATION, DELETE_ORGANIZATION} from "../queries/organization";
  import {get} from "svelte/store";


  // lifecycle: onMount
  onMount(() => {
    // Prevent a visual bug with WOW
    document.querySelector('.wow').style.visibility = 'visible';
    fetchOrganizations()
  });

  // Get page from the store. It should be called with $page
  const {page} = stores();

  // 2. Get the Apollo client from context
  const client = getClient();

  // Local reactive props
  import {readable} from "svelte/store";

  // We have to handle two cases, one for the client, the other for the server
  const organizations = typeof (window) !== 'undefined'
          ? query(
                  client,
                  {
                    query: GET_ORGANIZATIONS
                    // variables, fetchPolicy, errorPolicy, and others
                  }
          )
          : readable(
                  {
                    data: {
                      organizations: []
                    }
                  },
                  () => {}
          );


  let myOrganizations;

  // We want to access the data. Not required with this syntax:
  // organizations.result().then(v => console.log(v.data.organizations))
  // could be written get(organizations).then()
  // could also be written $organization.then()
  organizations.subscribe(value => {
    // Only if we have Promise
    if (value.then) {
      value.then(response => {
        myOrganizations = response.data.organizations;
      });
    }
  });

  function refreshOrganizations() {
    organizations.refetch()
  }

  /**
   *
   */
  function fetchOrganizations() {
    // client
    // .query({
    //   query: GET_ORGANIZATIONS
    // })
    // .then(response => {
    //   organizations = response.data.organizations;
    // });
  }


  function handleImport() {
    // const importFile = 'http://localhost:3000/import/lpco2_Organization_.json';
    for (let object of objects) {
      mutate(
              client, {
                mutation: CREATE_ORGANIZATION,
                variables: {
                  name: object.name,
                  companyId: object.companyId
                }
              })
      .then(data => {
        // console.log(data)
      })
      .catch(e => {
        console.error("error: ", e);
      });
    }
    organizations.refetch()
  }

  /**
   * Delete all organizations
   */
  function deleteOrganizations() {
    // const importFile = 'http://localhost:3000/import/lpco2_Organization_.json';
    // console.log(importFile)

    // could be written like this
    // organizations.result().then(v => console.log(v.data.organizations))
    for (let organization of myOrganizations) {
      mutate(
              client, {
                mutation: DELETE_ORGANIZATION,
                variables: {
                  id: organization.id,
                }
              })
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.error("error: ", e);
      });
    }
    organizations.refetch()
  }

  const objects = [
    {
      "organizationId": 11902,
      "companyId": 10253,
      "parentOrganizationId": 0,
      "treePath": "/11902/",
      "name": "Infré SA",
      "type_": "company",
      "recursable": 1,
      "regionId": 0,
      "countryId": 0,
      "statusId": 12017,
      "comments": ""
    },
  ]
</script>

<svelte:head>
  <title>Plateforme CO2 - User Administration</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn" style="visibility: hidden">

  <!--Grid column-->
  <div class="col-md">

    <!--Card content-->
    <div class="card-body">
      <button class="btn btn-default" on:click={handleImport}>Import Organizations</button>
      <button class="btn btn-default" on:click={refreshOrganizations}>Refresh Organizations</button>
      <button class="btn btn-default" on:click={deleteOrganizations}>Delete all Organizations</button>
    </div>

    <!--    todo import https://mdbootstrap.com/docs/jquery/tables/datatables/-->

    <!--/.Card-->
    <table id="dtMaterialDesignExample" class="table table-striped" cellspacing="0" width="100%">
      <thead>
      <tr>
        <th class="th-sm">Name
        </th>
      </tr>
      </thead>
      <tbody>

      {#await $organizations}
        <tr>
          <td>Loading...</td>
        </tr>

      {:then result}
        {#each result.data.organizations as organization (organization.id)}
          <tr>
            <td>{organization.name}</td>
          </tr>
        {/each}
      {:catch error}
        <tr>
          <td>ERROR: {error}</td>
        </tr>
      {/await}
              <!--      {#each organizations as organization}-->
      <!--        <tr>-->
      <!--          <td>{organization.name}</td>-->
      <!--        </tr>-->
      <!--      {/each}-->
      </tbody>
    </table>
  </div>
  <!--Grid column-->

</div>
<!--Grid row-->
