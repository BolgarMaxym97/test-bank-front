export default {
    methods: {
        cc_format(value) {
            const v = String(value).replace(/\s+/g, "").replace(/[^0-9]/gi, "");
            const matches = v.match(/\d{4,16}/g);
            const match = matches && matches[0] || "";
            let parts = [];
            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }
            if (parts.length) {
                return parts.join(" ");
            } else {
                return value;
            }
        }
    }
};
