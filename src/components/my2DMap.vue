<template>
  <div>
      <button  v-on:click="addlayer()">添加图层</button>
    <section class="nav">
      <div class="container">
        <div class="nav-left">
          <router-link to="/">
            <img src="../assets/CITY-LOGO.png" alt="Baltimore Logo" class="is-hidden-mobile">
          </router-link>
          <router-link to="/">
            <span class="title is-1 mapTitle">
              <small>{{mapTitle}}</small>
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <div id="viewDiv" class="balt-theme"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader';
var housingLyr;
var map;

export default {
  data() {
    return {
      mapTitle: ''
    }
  },
  watch: {
    '$route' (){
    }
  },
  computed: {
    createMap() {
      esriLoader.dojoRequire(["esri/views/MapView",
      "esri/WebMap","esri/Map",
      "esri/layers/StreamLayer",
      "esri/layers/TileLayer",
      "esri/layers/GraphicsLayer",
      "esri/geometry/Polygon",
      "esri/Graphic",
      "esri/widgets/Expand",
      "esri/widgets/Legend",
      "esri/widgets/LayerList",
      "esri/widgets/Search"
      ], (MapView, WebMap, Map, StreamLayer, TileLayer, GraphicsLayer, Polygon, Graphic, Expand, Legend, LayerList, Search) => {
        const webmap = new WebMap({
          portalItem: {
            id: "366874355d1d45219997159d13228826"//this.$route.params.mapID  //获取url中的参数
          }
        });
        housingLyr = new TileLayer({
            url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
            id: "ny-housing"
        });
        map = new Map({
            basemap: "streets"
        });
        const view = new MapView({
          map: map, //webmap,
          container: "viewDiv",
          zoom: 4,  // Sets zoom level based on level of detail (LOD)
          center: [15, 65]  // Sets center point of view using longitude,latitude
        });

        view.then (() => {
          this.mapTitle = webmap.portalItem.title;
            const legend = new Legend({
              view: view,
              container: document.createElement("div")
            });
            const layerList = new LayerList({
              view: view,
              container: document.createElement("div")
            });
            const legendExpand = new Expand({
              view: view,
              content: legend.domNode,
              expandIconClass: "esri-icon-collection",
              expandTooltip: "Legend"
            });
            const layersExpand = new Expand({
              view: view,
              content: layerList.domNode,
              expandIconClass: "esri-icon-layer-list",
              expandTooltip: "Layers"
            });
            view.ui.add(layersExpand,"top-right");
            view.ui.add(legendExpand, "top-right");
        });
        const searchWidget = new Search({
          view: view
        });

        view.ui.add(searchWidget, {
          position: "top-left",
          index: 0
        });
      });
    }
  },
  methods:{
      addlayer: function() {
          map.layers.add(housingLyr);
      }
  },
  mounted() {
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err);
        }
        this.createMap();
      }, {
        url: 'http://localhost:8080/arcgis_js_api/library/4.3/4.3/init.js'
      });
    } else {
      this.createMap();
    }
  }
}
</script>
<style>
@import url('http://localhost:8080/arcgis_js_api/library/4.3/4.3/esri/themes/dark/main.css');
.mapTitle:hover,
.mapTitle.focus {
  color: #9f9f9f;
}

#viewDiv {
  height: calc(100vh - 8.45rem);
  width: 100%;
}

table th {
  color: #fff;
}

.esri-expand__container .esri-widget-button {
  width: 42px;
  height: 42px;
}

form input[type="text"]::-webkit-input-placeholder {
  color: #fff !important;
}

.balt-theme .esri-widget,
.balt-theme .esri-widget-button,
.balt-theme .esri-menu,
.balt-theme .esri-popup__main-container,
.balt-theme .esri-popup .esri-pointer-direction,
.balt-theme .esri-button {
  background-color: #42484f;
  color: #fff;
}

.balt-theme .esri-widget-button:focus,
.balt-theme .esri-widget-button:hover,
.balt-theme .esri-menu li:focus,
.balt-theme .esri-menu li:hover {
  background-color: #000;
  color: #fff;
}

.balt-theme .esri-button:focus,
.balt-theme .esri-button:hover {
  color: #fff;
}
</style>
