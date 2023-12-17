import Post from './Author';
import './parts/style.scss'
import $ from "jquery";
import * as Vue from 'vue/dist/vue.esm-bundler'
const instance = new Post("Shalapai", 'My name is - ');


console.log("Is message from - "+instance.output());
async function initMap () {
    const map = new ymaps.Map("myMap", {
        center: [55.76, 37.64],
        zoom: 7
    });
}
Vue.createApp({
    name: 'webpack build',
    template: require('./root/index.html').default,
    data() {
        return {
            map: {
                type: Object,
                default: {}
            },
            map2: {
                type: Object,
                default: {}
            },
            list: {
                type: Array,
                default: ['1 index','2 index','3 index','4 index','5 index','6 index','7 index','8 index','9 index','10 index']
            }
        };
    },
    created() {
            let scriptYandexMap = document.createElement('script');
            scriptYandexMap.setAttribute('async', '');
            scriptYandexMap.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?load=package.standard&lang=ru_RU');
            document.head.appendChild(scriptYandexMap);
            //scriptYandexMap.addEventListener("load", this.initializeYandexMap);
    },
    mounted() {
        //this.loadMap();
    },
    setup(props){
        const initializeYandexMap = async () => {
            const map = new ymaps.Map("myMap", {
                center: [55.76, 37.64],
                zoom: 7
            });
            const myPieChart = new ymaps.Placemark([
                55.847, 37.6
            ], {
                // Данные для построения диаграммы.
                data: [
                    {weight: 8, color: '#0E4779'},
                    {weight: 6, color: '#1E98FF'},
                    {weight: 4, color: '#82CDFF'}
                ],
                iconCaption: "Диаграмма"
            }, {
                // Зададим произвольный макет метки.
                iconLayout: 'default#pieChart',
                // Радиус диаграммы в пикселях.
                iconPieChartRadius: 30,
                // Радиус центральной части макета.
                iconPieChartCoreRadius: 10,
                // Стиль заливки центральной части.
                iconPieChartCoreFillStyle: '#ffffff',
                // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeStyle: '#ffffff',
                // Ширина линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeWidth: 3,
                // Максимальная ширина подписи метки.
                iconPieChartCaptionMaxWidth: 200
            });
            map.geoObjects.add(myPieChart).add(new ymaps.Placemark([55.684758, 37.738521], {
                balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }));
            ymaps.ready(
                map.setBounds(map.geoObjects.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 35
                })
            );
            requestAjax();
        }
        const requestAjax = function () {
            //app.post('/', function (req, res) {
            //    res.send('Hello World')
            //})
        }
        const loadMap = () => {
            if (!window.ymaps) {
                setTimeout(loadMap, 3000);
            } else {
                ymaps.ready(initializeYandexMap());
            }
        }
        loadMap();
    },
    methods: {
        moveStart(item, event) {
            event.preventDefault();
        }
    }
}).mount('#app');