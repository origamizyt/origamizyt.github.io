/* 
Module for the resource protocol.
The resource protocol is defined as below:

A resource is a JSON object with the following fields:

resourceId - The global unique identifier of the resource.
secureResourceId - The scrypt-ed resource identifier with salt.
resourceName - The original version of the resource name.
displayName - The displayed version of the resource name.
description - The detailed documentation for the resource.
location - The web location where the resource is placed.

In the resource folder, there must be a fetch.json file with
an array of resources. The resource api will fetch the file for
a list of resources.
*/

(function (root) {
    root.Resource = 
    /**
     * A resource defined as above.
     */
    class Resource {
        /**
         * Constructs a new instance.
         * @param {string} resId The resource id. 
         * @param {string} sResId The base64-encoded secure id.
         * @param {string} resName The resource name.
         * @param {string} disName The display name.
         * @param {string} desc The description.
         * @param {string} loc The resource location.
         * @param {number} time The timestamp when the resource was created.
         */
        constructor(resId, sResId, resName, disName, desc, loc, time) {
            this.resourceId = resId;
            this.secureResourceId = sResId;
            this.resourceName = resName;
            this.displayName = disName;
            this.description = desc;
            this.location = loc;
            this.timestamp = time
        }
        /**
         * Navigates to this resource.
         */
        navigate() {
            window.location.assign(this.location);
        }
        /**
         * Constructs an instance from a json object.
         * @param {any} object The json object.
         * @returns {Resource} The constructed resource.
         */
        static fromJson(object) {
            return new Resource(
                object.resourceId,
                object.secureResourceId,
                object.resourceName,
                object.displayName,
                object.description,
                object.location,
                object.timestamp
            )
        }
    }
    root.fetch = 
    /**
     * Fetches the resources stored in the current directory.
     */
    async function _fetch() {
        return await fetch('fetch.json')
            .then(response => response.json())
            .then(json => json.map(obj => root.Resource.fromJson(obj)));
    }
})(window.resource = {});