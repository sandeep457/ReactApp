export const API_DOMAIN = "https://api.apilayer.com/exchangerates_data/convert?"
export const API_KEY = "kEzvSEwwu1I639OScL3lMEZY71Oe42Y1"
export const endpointPath = (from, to, amount) =>
    `${API_DOMAIN}to=${to}&from=${from}&amount=${amount}`;

    