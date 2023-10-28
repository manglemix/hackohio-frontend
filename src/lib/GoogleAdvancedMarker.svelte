<script>
    import { getContext } from 'svelte'
    import { key } from './contexts'
    import { Loader } from "@googlemaps/js-api-loader"
    await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  
    const { getMap } = getContext(key)
    const map = getMap()
  
    export let lat
    export let lng
    export let icon
  
    // eslint-disable-next-line no-new
    new window.google.maps.MarkerLibrary({
      position: { lat, lng },
      icon,
      map
    })
  </script>