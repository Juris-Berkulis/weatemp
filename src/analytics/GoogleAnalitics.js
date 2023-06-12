export default class GoogleAnalytics {
    #hostings = {
        netlify: {
            trackingId: 'G-5THFP39CPF',
        },
        vercel: {
            trackingId: 'G-T53D5LYJLY',
        },
        surge: {
            trackingId: 'G-MD1RD8TCR8',
        },
    }

    #analiticListners = {
        'weatherNowView': () => this.listenerFunc('weatherNowViewIsOpened', 'page', 'weather_now_view_is_opened'),
        'weatherOnFiveDaysView': () => this.listenerFunc('weatherOnFiveDaysViewIsOpened', 'page', 'weather_on_five_days_view_is_opened'),
        'airPollutionNowView': () => this.listenerFunc('airPollutionNowViewIsOpened', 'page', 'air_pollution_now_view_is_opened'),
        'airPollutionOnFourDaysView': () => this.listenerFunc('airPollutionOnFourDaysViewIsOpened', 'page', 'air_pollution_on_four_days_view_is_opened'),
        'installPWA': () => this.listenerFunc('installPWA', 'btn', 'install_PWA_btn'),
        'getByCoordsBtn': () => this.listenerFunc('getByCoordsBtn', 'btn', 'get_by_coords_btn'),
        'getByCityBtn': () => this.listenerFunc('getByCityBtn', 'btn', 'get_by_city_btn'),
        'descriptionAboutAirPollutantsIsOpened': () => this.listenerFunc('airPollutantsInfoIsOpened', 'btn', 'description_about_air_pollutants_is_opened'),
        'descriptionAboutAirPollutantsIsClosed': () => this.listenerFunc('airPollutantsInfoIsClosed', 'btn', 'description_about_air_pollutants_is_closed'),
    }

    constructor () {
        this.getScript()
    }

    getDomen () {
        return location.hostname.split('.')[1]
    }

    getTrackingId () {
        const hostingOptions = this.#hostings[this.getDomen()];

        if (hostingOptions) {
            return hostingOptions.trackingId
        } else {
            return null
        }
    }

    getScript1 (trackingId) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;

        return script
    }

    getScript2 (trackingId) {
        const script = document.createElement("script");
        script.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
        `;

        return script
    }

    listenerFunc (eventName, element, description) {
        gtag(
            'event', 
            eventName, 
            {
                'element': element,
                'description': description,
            }
        );
    }

    checkClickedElement (event) {
        const eventTarget = event.target;

        if (eventTarget.id && typeof this.#analiticListners[eventTarget.id] === 'function') {
            this.#analiticListners[eventTarget.id]();
        }
    }

    addAnalyticsListener () {
        window.addEventListener('click', (event) => this.checkClickedElement(event), {capture: true});
    }

    getScript () {
        const trackingId = this.getTrackingId();
        
        if (trackingId) {
            document.head.insertAdjacentElement("beforeend", this.getScript1(trackingId));
            document.head.insertAdjacentElement("beforeend", this.getScript2(trackingId));

            this.addAnalyticsListener();
        }
    }
};
