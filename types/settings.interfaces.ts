interface Sentry {
    dsn: string;
}

interface Analytics {
    trackingId: string;
    accountId: string;
    domain: string;
}

interface AdSense {
    adClient: string;
}

interface Google {
    test: boolean;
    analytics: Analytics;
    adsense: AdSense;
}

interface Settings {
    version: string;
    sentry: Sentry;
    google: Google;
}

export default Settings;
