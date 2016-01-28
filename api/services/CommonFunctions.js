module.exports = {
    // checks if all keys from kyesArr presents in obj. Returns true if all keys present, or returns first missing key
    areKeysInObj: function(keysArr, obj) {
        for (var i = 0; i < keysArr.length; i++) {
            if(!(keysArr[i] in obj)) {
                return keysArr[i];
            }

        };
        return true;
    }
}