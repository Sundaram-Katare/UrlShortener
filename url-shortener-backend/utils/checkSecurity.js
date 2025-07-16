export const checkSecurity = (url) => {
    let score = 100;

    try {
        const parsed = new URL(url);
        const hostname = parsed.hostname;
        const protocol = parsed.protocol;

        if (protocol !== 'https:') score -= 30;

        if (hostname.length < 8) score -= 10;

        if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) score -= 30;

        const suspiciousKeyword = ['login', 'bank', 'claim', 'password', 'free'];

        suspiciousKeyword.forEach(word => {
            if (url.toLowerCase().includes(word)) {
                score -= 10;
            }
        });

        if (score < 0) {
            score = 0;
        }
         return score;
    } catch {
        return 0; // invalid URL = 0%
    }
};