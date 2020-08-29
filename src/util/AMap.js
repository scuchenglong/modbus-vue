// AMap.js
// 高德map   https://webapi.amap.com/maps?v=1.4.11&key=你的高德地图的key
export default function MapLoader () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src =
        'http://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=7e9cf2797ea79ea76016267654591a4f&plugin=AMap.Transfer,AMap.AdvancedInfoWindow'
      script.onerror = reject
      document.head.appendChild(script)


    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}
