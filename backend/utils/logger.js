const logger = {
    info(message) {
        console.log(`ℹ️ INFO : ${message}`);
    },

    success(message) {
        console.log(`✅ SUCCESS : ${message}`);
    },

    warning(message) {
        console.warn(`⚠️ WARNING : ${message}`);
    },

    error(message) {
        console.error(`❌ ERROR : ${message}`);
    }
};

export default logger;