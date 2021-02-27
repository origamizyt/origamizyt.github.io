this.tools = {};
(function (W){
    W.parameters = string => {
        if (string === undefined) 
            string = window.location.search;
        if (string.startsWith("?")) 
            string = string.substr(1);
        result = {};
        string.split("&").forEach(item => {
            let parts = item.split("=");
            let name = parts[0];
            let value = parts[1];
            result[name] = value;
        });
        return result;
    }
})(this.tools);